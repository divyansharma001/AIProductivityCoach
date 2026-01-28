import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ host: "localhost", port: 6333 });

const COLLECTION_NAME = "productivity_logs";

export const vectorService = {
  client,
  COLLECTION_NAME,

  async initCollection() {
    try {
      const result = await client.getCollections();
      const exists = result.collections.some((c) => c.name === COLLECTION_NAME);

      if (!exists) {
        await client.createCollection(COLLECTION_NAME, {
          vectors: {
            size: 3072, 
            distance: "Cosine",
          },
        });
        console.log(`Vector collection '${COLLECTION_NAME}' created.`);
      } else {
        console.log(`Vector collection '${COLLECTION_NAME}' already exists.`);
      }
    } catch (error) {
      console.error("Error initializing Qdrant collection:", error);
    }
  },

  
  async search(vector: number[], limit: number = 5) {
    return client.search(COLLECTION_NAME, {
      vector,
      limit,
      with_payload: true,
    });
  },


  async upsertPoint(id: string, vector: number[], payload: Record<string, any>) {
    return client.upsert(COLLECTION_NAME, {
      points: [
        {
          id,
          vector,
          payload,
        },
      ],
    });
  }
};