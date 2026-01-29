import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ host: "localhost", port: 6333 });

export const vectorService = {
  client,
  LOGS_COLLECTION: "productivity_logs",
  FACTS_COLLECTION: "user_facts",

  async initCollection() {
    try {
      const result = await client.getCollections();
      const collections = result.collections.map((c) => c.name);

      if (!collections.includes(this.LOGS_COLLECTION)) {
        await client.createCollection(this.LOGS_COLLECTION, {
          vectors: { size: 3072, distance: "Cosine" },
        });
        console.log(`Collection '${this.LOGS_COLLECTION}' created.`);
      }

      if (!collections.includes(this.FACTS_COLLECTION)) {
        await client.createCollection(this.FACTS_COLLECTION, {
          vectors: { size: 3072, distance: "Cosine" },
        });
        console.log(`Collection '${this.FACTS_COLLECTION}' created.`);
      }
      
    } catch (error) {
      console.error("Error initializing Qdrant collections:", error);
    }
  },
  
 async search(collectionName: string, vector: number[], limit: number = 5, userId: string) {
    return client.search(collectionName, {
      vector,
      limit,
      filter: {
        must: [{ key: "userId", match: { value: userId } }]
      },
      with_payload: true,
    });
  },


async upsertPoint(collectionName: string, id: string, vector: number[], payload: Record<string, any>) {
    return client.upsert(collectionName, {
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