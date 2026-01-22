
export const Home = (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    memory: process.memoryUsage().rss,
    time: Date.now()
  })
}


