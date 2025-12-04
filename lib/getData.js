export default async function getData() {
  const res = await fetch("https://dhruvil-electricals.vercel.app/categories", {
    cache: "no-store",
  });

  return res.json();
}
