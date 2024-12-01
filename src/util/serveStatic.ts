import { createMiddleware } from "hono/factory";
import fs from "fs";
import { getMimeType } from "hono/utils/mime";

/** node serverで動く静的ファイル配信ミドルウェア (mime type 対応) */
export const serveStatic = (options: {root:string}) =>{
    return createMiddleware(async (c,next) => {
        if (c.finalized) {
            return next();
        }
        const filepath = options.root+c.req.path
        if (fs.existsSync(filepath))
        {
            const data = fs.readFileSync(filepath,{encoding:'utf-8'})
            const mimeType = getMimeType(filepath)
            return c.newResponse(data,200,{
                "Content-Type": mimeType ? mimeType:'text/plain'
            })
        } else {
            return c.notFound()
        }
    })
}
