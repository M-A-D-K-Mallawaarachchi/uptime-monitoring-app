const fs = require('fs');
const sites = require('./sites.json');

const historyLimit = 10; // Number of status records to keep per site

const getStatus = async (site) => {
  try {
    const response = await axios.get(site.url);
    return response.status === 200 ? 'Online' : 'Offline';
  } catch (error) {
    return 'Offline';
  }
};

const updateSiteStatus = async (site) => {
  const status = await getStatus(site);
  site.status.unshift({ timestamp: new Date().toISOString(), status });
  if (site.status.length > historyLimit) {
    site.status.pop();
  }
};

const monitorSites = () => {
  console.log('Monitoring sites:');
  sites.forEach(async (site) => {
    await updateSiteStatus(site);
    console.log(`${site.name}: ${site.status[0].status}`);
  });
  console.log('---');
};

cron.schedule('* * * * *', monitorSites);
