import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ host: "localhost", port: 6333 });

export const vectorService = {
  client,
  LOGS_COLLECTION: "productivity_logs",
  FACTS_COLLECTION: "user_facts",
  SUMMARIES_COLLECTION: "daily_summaries",

  async initCollection() {
    try {
      const result = await client.getCollections();
      const collections = result.collections.map((c) => c.name);

      const ensureCollection = async (name: string) => {
        if (!collections.includes(name)) {
          await client.createCollection(name, {
            vectors: { size: 3072, distance: "Cosine" },
          });
          console.log(`Collection '${name}' created.`);
        }
      };

      await ensureCollection(this.LOGS_COLLECTION);
      await ensureCollection(this.FACTS_COLLECTION);
      await ensureCollection(this.SUMMARIES_COLLECTION); 

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
  },

  async getPoint(collectionName: string, id: string) {
    try {
      const result = await client.retrieve(collectionName, {
        ids: [id],
        with_payload: true
      });
      return result[0] || null;
    } catch (error) {
      return null;
    }
  }
};