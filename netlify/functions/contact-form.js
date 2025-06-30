// netlify/functions/contact-form.js

// This function acts as a proxy to securely send data to Formspree.
// The Formspree endpoint (FORM_ID) is stored as an environment variable on Netlify.

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST' }
    };
  }

  // Ensure the Formspree endpoint is set as an environment variable in Netlify
  const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

  if (!FORMSPREE_ENDPOINT) {
    console.error("FORMSPREE_ENDPOINT environment variable is not set!");
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server configuration error: Form endpoint missing.' }),
    };
  }

  try {
    const formData = JSON.parse(event.body);

    // Forward the data to Formspree
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Handle Formspree's response
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Message sent successfully!' }),
      };
    } else {
      const errorData = await response.json();
      console.error("Formspree error:", errorData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: errorData.error || 'Failed to send message via Formspree.' }),
      };
    }
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error.' }),
    };
  }
};