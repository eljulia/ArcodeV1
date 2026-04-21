-- MVP: Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  tipo_negocio TEXT NOT NULL CHECK (tipo_negocio IN ('restaurante', 'spa', 'profesional', 'pyme', 'otro')),
  necesidad TEXT,
  telefono TEXT,
  fuente TEXT DEFAULT 'formulario',
  landing_origen TEXT,
  estado TEXT DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'contactado', 'calificado', 'cerrado', 'descartado')),
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- MVP: Casos de éxito
CREATE TABLE IF NOT EXISTS casos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  empresa TEXT NOT NULL,
  sector TEXT NOT NULL CHECK (sector IN ('restaurante', 'spa', 'profesional', 'pyme')),
  problema TEXT NOT NULL,
  solucion TEXT NOT NULL,
  servicio_utilizado TEXT NOT NULL CHECK (servicio_utilizado IN ('chatbots', 'web', 'flow', 'academia')),
  metrica_principal TEXT NOT NULL,
  tiempo_implementacion TEXT,
  contexto TEXT,
  resultado_detalle JSONB,
  cita_cliente TEXT,
  imagen_url TEXT,
  publicado BOOLEAN DEFAULT false,
  orden INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- MVP: Servicios
CREATE TABLE IF NOT EXISTS servicios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  descripcion_corta TEXT NOT NULL,
  problema TEXT NOT NULL,
  solucion TEXT NOT NULL,
  precio_base TEXT,
  verticales TEXT[],
  orden INT DEFAULT 0,
  activo BOOLEAN DEFAULT true
);

-- MVP: Precios
CREATE TABLE IF NOT EXISTS precios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  servicio_id UUID REFERENCES servicios(id) ON DELETE CASCADE,
  nivel TEXT NOT NULL CHECK (nivel IN ('entrada', 'crecimiento', 'premium')),
  nombre TEXT NOT NULL,
  precio TEXT NOT NULL,
  caracteristicas JSONB NOT NULL,
  destacado BOOLEAN DEFAULT false,
  orden INT DEFAULT 0
);

-- V1: Blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  extracto TEXT,
  imagen_url TEXT,
  tags TEXT[],
  publicado BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- V1: Talleres
CREATE TABLE IF NOT EXISTS talleres (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('presencial', 'in-company', 'online')),
  ciudad TEXT,
  fecha TIMESTAMPTZ,
  precio TEXT,
  cupos_disponibles INT,
  descripcion TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- V1: Suscriptores
CREATE TABLE IF NOT EXISTS suscriptores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nombre TEXT,
  recurso_descargado TEXT,
  fuente TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger: actualizar updated_at en leads
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE casos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE precios ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE talleres ENABLE ROW LEVEL SECURITY;
ALTER TABLE suscriptores ENABLE ROW LEVEL SECURITY;

-- Leads: solo service role
CREATE POLICY "leads_service_only" ON leads
  USING (auth.role() = 'service_role');

-- Casos publicados: lectura pública
CREATE POLICY "casos_public_read" ON casos
  FOR SELECT USING (publicado = true);

-- Servicios activos: lectura pública
CREATE POLICY "servicios_public_read" ON servicios
  FOR SELECT USING (activo = true);

-- Precios: lectura pública
CREATE POLICY "precios_public_read" ON precios
  FOR SELECT USING (true);

-- Blog posts publicados: lectura pública
CREATE POLICY "blog_posts_public_read" ON blog_posts
  FOR SELECT USING (publicado = true);

-- Talleres activos: lectura pública
CREATE POLICY "talleres_public_read" ON talleres
  FOR SELECT USING (activo = true);

-- Suscriptores: solo service role
CREATE POLICY "suscriptores_service_only" ON suscriptores
  USING (auth.role() = 'service_role');
