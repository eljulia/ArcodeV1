-- Seed: Servicios iniciales de Arcode
INSERT INTO servicios (slug, nombre, descripcion_corta, problema, solucion, precio_base, verticales, orden) VALUES
(
  'chatbots',
  'Arcode Chatbots & Agentes IA',
  'Chatbots de WhatsApp y web que responden preguntas, toman pedidos y calificán leads 24/7.',
  'Tu equipo pierde horas respondiendo las mismas preguntas por WhatsApp y correo.',
  'Implementamos un agente de IA entrenado con la información de tu negocio que responde automáticamente, califica leads y escala a un humano cuando es necesario.',
  'Desde $1.200.000 COP',
  ARRAY['restaurante', 'spa', 'profesional', 'pyme'],
  1
),
(
  'web',
  'Arcode Web',
  'Sitios web de alta conversión con SEO técnico, carga rápida y CTAs que generan leads.',
  'Tu sitio web actual no convierte visitantes en clientes, carga lento o no aparece en Google.',
  'Desarrollamos sitios web en Next.js con SEO técnico, optimizados para mobile y con Lighthouse ≥ 90.',
  'Desde $2.500.000 COP',
  ARRAY['restaurante', 'spa', 'profesional', 'pyme'],
  2
),
(
  'flow',
  'Arcode Flow',
  'Automatizaciones de procesos con n8n y Make: reservas, facturación, seguimiento de leads.',
  'Tienes procesos manuales y repetitivos que consumen tiempo valioso de tu equipo.',
  'Mapeamos tus procesos y los automatizamos con n8n, Make y APIs de terceros. Resultado: menos errores, más velocidad.',
  'Desde $800.000 COP',
  ARRAY['restaurante', 'spa', 'profesional', 'pyme'],
  3
),
(
  'academia',
  'Arcode Academy',
  'Talleres presenciales y online para aprender a implementar IA en tu negocio.',
  'Quieres implementar IA pero no sabes por dónde empezar ni en qué herramientas invertir.',
  'Talleres prácticos de 4-8 horas con casos reales del mercado colombiano. Sin tecnicismos, con resultados aplicables desde el día 1.',
  'Desde $250.000 COP',
  ARRAY['restaurante', 'spa', 'profesional', 'pyme'],
  4
);

-- Seed: Precios para Chatbots
WITH s AS (SELECT id FROM servicios WHERE slug = 'chatbots')
INSERT INTO precios (servicio_id, nivel, nombre, precio, caracteristicas, destacado, orden)
SELECT s.id, 'entrada', 'Starter', '$1.200.000 COP',
  '["Chatbot de WhatsApp", "Hasta 500 conversaciones/mes", "Preguntas frecuentes", "Escalamiento a humano", "Soporte 30 días"]'::jsonb,
  false, 1 FROM s
UNION ALL
SELECT s.id, 'crecimiento', 'Growth', '$2.400.000 COP',
  '["Chatbot WhatsApp + Web", "Hasta 2.000 conversaciones/mes", "Calificación de leads", "Integración CRM básica", "Analíticas de conversación", "Soporte 60 días"]'::jsonb,
  true, 2 FROM s
UNION ALL
SELECT s.id, 'premium', 'Pro', '$4.500.000 COP',
  '["Multi-canal (WhatsApp, Web, Instagram)", "Conversaciones ilimitadas", "IA entrenada con tu base de conocimiento", "Integraciones avanzadas", "Panel de analytics", "Soporte 90 días + revisiones"]'::jsonb,
  false, 3 FROM s;

-- Seed: Precios para Web
WITH s AS (SELECT id FROM servicios WHERE slug = 'web')
INSERT INTO precios (servicio_id, nivel, nombre, precio, caracteristicas, destacado, orden)
SELECT s.id, 'entrada', 'Landing Page', '$2.500.000 COP',
  '["1 página de aterrizaje", "Mobile-first", "SEO básico", "Formulario de contacto", "WhatsApp flotante", "Entrega en 7 días"]'::jsonb,
  false, 1 FROM s
UNION ALL
SELECT s.id, 'crecimiento', 'Sitio Institucional', '$4.500.000 COP',
  '["Hasta 6 páginas", "CMS para editar contenido", "SEO técnico completo", "Blog integrado", "Analytics + Clarity", "Entrega en 14 días"]'::jsonb,
  true, 2 FROM s
UNION ALL
SELECT s.id, 'premium', 'Web + IA', '$7.500.000 COP',
  '["Sitio completo + Chatbot integrado", "Chatbot de WhatsApp", "SEO avanzado + Schema markup", "Velocidad Lighthouse ≥ 95", "Panel de administración", "Mantenimiento 6 meses"]'::jsonb,
  false, 3 FROM s;

-- Seed: Casos de éxito de demo (publicado=false por defecto — activar cuando tengas datos reales)
INSERT INTO casos (slug, empresa, sector, problema, solucion, servicio_utilizado, metrica_principal, tiempo_implementacion, contexto, cita_cliente, publicado, orden) VALUES
(
  'restaurante-el-carbon',
  'Restaurante El Carbón',
  'restaurante',
  'El equipo perdía 3 horas diarias respondiendo preguntas por WhatsApp: menú, precios, horarios y reservas. Los fines de semana era caótico.',
  'Implementamos un chatbot de WhatsApp con n8n que responde automáticamente las 50+ preguntas frecuentes, toma reservas de mesa y califica si el cliente requiere atención humana.',
  'chatbots',
  'Reducción del 85% en consultas repetitivas',
  'Implementado en 7 días',
  'Restaurante de carnes a la parrilla en Armenia con 45 sillas. Pico de atención viernes y sábado en la noche.',
  'Antes nos perdíamos reservas porque no alcanzábamos a responder. Ahora el bot maneja todo y nosotros solo atendemos lo importante.',
  false,
  1
),
(
  'spa-seren',
  'Spa Serén',
  'spa',
  'La recepcionista no alcanzaba a responder todos los mensajes de clientes que consultaban disponibilidad de citas. Muchos se iban a la competencia.',
  'Chatbot de WhatsApp integrado con el sistema de citas que muestra disponibilidad en tiempo real y permite agendar sin intervención humana.',
  'chatbots',
  '40% más citas agendadas en el primer mes',
  'Implementado en 10 días',
  'Spa de bienestar con 4 cabinas en Armenia. Servicios: masajes, tratamientos faciales y corporales.',
  'Las clientas ahora agendan a las 11pm cuando se acuerdan. Antes eso era imposible.',
  false,
  2
),
(
  'contador-alvarez',
  'Estudio Álvarez & Asociados',
  'profesional',
  'El contador pasaba 2 horas diarias respondiendo correos con las mismas preguntas sobre servicios, precios y documentos requeridos.',
  'Landing page de alta conversión + automatización de respuesta inicial por email con información personalizada según el tipo de consulta.',
  'web',
  '2 horas/día recuperadas + 30% más consultas calificadas',
  'Implementado en 5 días',
  'Contador público con 8 años de experiencia. Servicios para personas naturales y PYMEs en el Eje Cafetero.',
  'Ahora los clientes llegan a mi primera llamada ya informados. Las reuniones son más productivas.',
  false,
  3
);
