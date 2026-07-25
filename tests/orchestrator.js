import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error;
      }
    }
  }
}

const orchestrator = {
  waitForAllServices,
};

export default orchestrator;
