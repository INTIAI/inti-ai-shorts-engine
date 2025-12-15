import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Health check
app.get("/", (req, res) => {
  res.json({
    service: "INTI Short Engineer",
    status: "running",
    version: "v1"
  });
});

// Crear job de short (MVP)
app.post("/shorts", async (req, res) => {
  const { youtube_url, seconds } = req.body;

  if (!youtube_url) {
    return res.status(400).json({ error: "youtube_url es requerido" });
  }

  const jobId = uuidv4();

  // Por ahora solo simulamos el job (MVP)
  res.json({
    job_id: jobId,
    status: "queued",
    seconds: seconds || 15,
    source: youtube_url
  });
});

app.listen(PORT, () => {
  console.log(`INTI Short Engineer activo en puerto ${PORT}`);
});
