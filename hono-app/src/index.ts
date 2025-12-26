import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { ExecutionContext } from "hono";

export interface Env{
  DATABASE_URL:string
}

export default {
  async fetch(
      request: Request,
      env: Env,
      ctx:ExecutionContext
  ):Promise<Response>{
      const prisma = new PrismaClient({
        datasources: {
          db: {
            url: env.DATABASE_URL,
          },
        },
      }).$extends(withAccelerate())
      const res = await prisma.log.create({
        data:{
          level: "Info",
          message: "hii",
          meta:{
            headers: JSON.stringify(request.headers)
          }
        }
      })
      console.log(JSON.stringify(res));

      return Response.json(res);
  }
}