exports.handler = async function(event, context) {
  // Demo stub: this does NOT persist counts across cold starts on many serverless platforms.
  // For real persistent counters, connect to a database (Supabase, Fauna, DynamoDB) and increment there.
  if (event.httpMethod === 'POST' || event.httpMethod === 'GET') {
    // Return a mock count and note that it's a demo.
    return {
      statusCode: 200,
      body: JSON.stringify({ count: 1234, note: 'This is a demo stub. Replace with DB-backed implementation for real counts.' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
  return { statusCode: 405, body: 'Method not allowed' };
};
