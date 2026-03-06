const fs = require('fs');
const path = require('path');

function transformWebflowData(inputFile = 'src/data/webflow-items.json', outputDir = 'src/data') {
  const rawData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  
  const articles = (rawData.items || []).map(item => {
    const fd = item.fieldData;
    const slug = fd.slug || (fd.name || 'unnamed').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    return {
      id: item.id,
      slug: slug,
      name: fd.name || '',
      title: fd['seo-title'] || fd.name || '',
      description: fd['seo-description'] || '',
      content: fd['content-article'] || '',
      faq: fd['faq-section'] || '',
      hero: {
        heading: fd['hero-heading-2'] || '',
        subheading: fd['hero-subheading-2'] || '',
        ready: fd['hero-ready'] || false,
        ctaText: fd['hero-cta-text'] || 'Jetzt kaufen',
        ctaUrl: fd['hero-cta-url'] || 'https://www.siliconedolls24.com'
      },
      product: {
        brand: fd.brand || '',
        model: fd.model || '',
        price: fd.price || '0',
        currency: fd.currency || 'EUR'
      },
      createdAt: item.createdOn,
      updatedAt: item.lastUpdated
    };
  });

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  fs.writeFileSync(path.join(outputDir, 'articles.json'), JSON.stringify(articles, null, 2));
  
  const metadata = { total: articles.length, lastSync: new Date().toISOString() };
  fs.writeFileSync(path.join(outputDir, 'metadata.json'), JSON.stringify(metadata, null, 2));
  
  console.log(`Transformed ${articles.length} articles`);
  return articles;
}

if (require.main === module) {
  transformWebflowData();
}

module.exports = { transformWebflowData };
