import fs from 'fs'
await fs.unlink(`uploads/91a90775cc83f54bfbf5c5bc3591a40a`,() => {
                console.log("file deleted");
            })