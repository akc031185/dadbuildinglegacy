#!/usr/bin/env node

const https = require('https');

const webhookTests = [
  {
    name: 'Domain Sherpa (Test)',
    url: 'https://akc031185.app.n8n.cloud/webhook-test/domain-sherpa',
    payload: {
      business: 'Tech Startup',
      industry: 'Software Development',
      keywords: ['tech', 'startup', 'innovation'],
      preferredTlds: ['.com', '.io']
    }
  },
  {
    name: 'Domain Sherpa (Prod)',
    url: 'https://akc031185.app.n8n.cloud/webhook/domain-sherpa',
    payload: {
      business: 'Tech Startup',
      industry: 'Software Development',
      keywords: ['tech', 'startup', 'innovation'],
      preferredTlds: ['.com', '.io']
    }
  },
  {
    name: 'Logo Brandsmith (Test)',
    url: 'https://akc031185.app.n8n.cloud/webhook-test/logo-brandsmith',
    payload: {
      companyName: 'Tech Innovations Inc',
      industry: 'Technology',
      description: 'AI-powered software solutions',
      style: 'modern',
      colors: ['#3B82F6', '#1E40AF']
    }
  },
  {
    name: 'Logo Brandsmith (Prod)',
    url: 'https://akc031185.app.n8n.cloud/webhook/logo-brandsmith',
    payload: {
      companyName: 'Tech Innovations Inc',
      industry: 'Technology',
      description: 'AI-powered software solutions',
      style: 'modern',
      colors: ['#3B82F6', '#1E40AF']
    }
  },
  {
    name: 'Site Builder (Test)',
    url: 'https://akc031185.app.n8n.cloud/webhook-test/site-builder',
    payload: {
      companyName: 'Tech Solutions',
      industry: 'Software Development',
      services: ['Web Development', 'AI Consulting'],
      targetAudience: 'Businesses looking for digital transformation',
      tone: 'professional'
    }
  },
  {
    name: 'Site Builder (Prod)',
    url: 'https://akc031185.app.n8n.cloud/webhook/site-builder',
    payload: {
      companyName: 'Tech Solutions',
      industry: 'Software Development',
      services: ['Web Development', 'AI Consulting'],
      targetAudience: 'Businesses looking for digital transformation',
      tone: 'professional'
    }
  },
  {
    name: 'GHL Opportunity (Test)',
    url: 'https://akc031185.app.n8n.cloud/webhook-test/ghl-opportunity',
    payload: {
      contactName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      companyName: 'Example Corp',
      projectDescription: 'Need a new website',
      budget: 10000
    }
  },
  {
    name: 'GHL Opportunity (Prod)',
    url: 'https://akc031185.app.n8n.cloud/webhook/ghl-opportunity',
    payload: {
      contactName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      companyName: 'Example Corp',
      projectDescription: 'Need a new website',
      budget: 10000
    }
  }
];

async function testWebhook(test) {
  return new Promise((resolve) => {
    const url = new URL(test.url);
    const postData = JSON.stringify(test.payload);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + '?' + new URLSearchParams(test.payload).toString(),
      method: 'GET',
      headers: {}
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`✅ ${test.name}: Status ${res.statusCode}`);
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(data);
            console.log(`   Response: ${JSON.stringify(result).substring(0, 100)}...`);
          } catch (e) {
            console.log(`   Response: ${data.substring(0, 100)}...`);
          }
        } else {
          console.log(`   Error: ${data.substring(0, 200)}`);
        }
        resolve({ name: test.name, status: res.statusCode, success: res.statusCode === 200 });
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${test.name}: ${err.message}`);
      resolve({ name: test.name, status: 'ERROR', success: false, error: err.message });
    });

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing n8n Cloud Webhooks...\n');
  
  const results = [];
  for (const test of webhookTests) {
    const result = await testWebhook(test);
    results.push(result);
    console.log(''); // Empty line between tests
  }
  
  console.log('📊 Test Summary:');
  console.log('================');
  const successful = results.filter(r => r.success).length;
  console.log(`✅ Successful: ${successful}/${results.length}`);
  console.log(`❌ Failed: ${results.length - successful}/${results.length}`);
  
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    console.log('\n❌ Failed Webhooks:');
    failed.forEach(f => console.log(`   - ${f.name}: ${f.error || f.status}`));
  }
}

runTests();