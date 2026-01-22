export const xtal = async (req, res) => {
  try {
    res.json({
      endpoin: "/api/xtall/search/:name",
      desc: "untuk mencari xtall beserta statnya."
    })
  } catch (err) {
    console.log("[error]" + err);
  }
}
