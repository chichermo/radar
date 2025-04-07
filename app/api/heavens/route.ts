export async function GET() {
  const res = await fetch("https://api.heavens-above.com/VisiblePasses/?lat=0&lng=0&alt=0&tz=UTC", {
    headers: {
      'User-Agent': 'Radar Espacial/1.0',
    },
  });

  const data = await res.json();
  return Response.json(data);
}
