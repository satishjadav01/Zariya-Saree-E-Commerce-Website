CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  colors TEXT[] NOT NULL DEFAULT '{}',
  image_key TEXT NOT NULL,
  alt TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable"
ON public.products
FOR SELECT
TO anon, authenticated
USING (true);

INSERT INTO public.products (id, name, category, price, colors, image_key, alt, description) VALUES
  ('rajmahal', 'Rajmahal Banarasi', 'Banarasi', 48500, ARRAY['oklch(0.33 0.11 20)', 'oklch(0.76 0.105 78)'], 'hero', 'Maroon Banarasi silk saree with gold zari', 'Pure katan silk with real zari jaal, woven over 42 days in Varanasi.'),
  ('neelambari', 'Neelambari Kanjivaram', 'Kanjivaram', 62000, ARRAY['oklch(0.4 0.2 265)', 'oklch(0.76 0.105 78)'], 'blue', 'Royal blue Kanjivaram saree with temple border', 'Mulberry silk with korvai temple border from Kanchipuram looms.'),
  ('gulabo', 'Gulabo Organza', 'Designer', 36800, ARRAY['oklch(0.82 0.06 15)', 'oklch(0.9 0.02 85)'], 'pink', 'Blush pink designer organza saree with sequins', 'Hand-embellished organza with crystal and sequin vines.'),
  ('suhaag', 'Suhaag Bridal', 'Wedding', 89000, ARRAY['oklch(0.48 0.19 27)', 'oklch(0.76 0.105 78)'], 'red', 'Crimson wedding Banarasi saree', 'Heirloom bridal weave with dense kadhua zari motifs.'),
  ('basant', 'Basant Tussar', 'Festive', 24500, ARRAY['oklch(0.78 0.15 85)', 'oklch(0.45 0.2 350)'], 'mustard', 'Mustard festive tussar silk saree with magenta border', 'Wild tussar silk with a contrast magenta pallu for festive days.'),
  ('panna', 'Panna Silk', 'Silk', 54000, ARRAY['oklch(0.35 0.08 160)', 'oklch(0.76 0.105 78)'], 'emerald', 'Emerald silk saree with gold border', 'Lustrous emerald silk finished with an antique gold border.');