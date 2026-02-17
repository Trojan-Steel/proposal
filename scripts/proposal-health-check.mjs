const port = Number.parseInt(process.env.PROPOSAL_PORT || "4174", 10);
const url = `http://localhost:${port}/health`;

async function main() {
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    console.error(`Health check fetch failed for ${url}`);
    console.error(error?.message || String(error));
    process.exit(1);
  }

  const bodyText = await response.text();
  console.log(`URL: ${url}`);
  console.log(`STATUS: ${response.status}`);
  console.log(`BODY: ${bodyText}`);

  if (!response.ok) {
    process.exit(1);
  }

  try {
    const payload = JSON.parse(bodyText);
    if (!payload || payload.ok !== true) {
      console.error("Health endpoint did not return { ok: true }");
      process.exit(1);
    }
  } catch (error) {
    console.error("Health endpoint did not return valid JSON");
    console.error(error?.message || String(error));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error?.message || String(error));
  process.exit(1);
});
