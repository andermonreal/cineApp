import React from 'react';

const Section = ({ icon, title, children }) => (
  <div className="mb-5">
    <h5 className="fw-bold d-flex align-items-center gap-2 mb-3 text-dark">
      <i className={`bi ${icon} text-primary`}></i>
      {title}
    </h5>
    <div className="text-muted" style={{ lineHeight: 1.9 }}>
      {children}
    </div>
  </div>
);

const LegalPage = () => (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 72, height: 72 }}>
            <i className="bi bi-shield-check text-primary fs-2"></i>
          </div>
          <h2 className="fw-bold">Aviso Legal</h2>
          <p className="text-muted">Última actualización: enero de 2025</p>
        </div>

        <div className="card border-0 shadow-sm p-4 p-md-5">
          <Section icon="bi-building" title="1. Datos del titular">
            <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, se ponen a disposición de los usuarios los datos identificativos del titular:</p>
            <ul className="list-unstyled ms-3">
              <li><strong>Denominación:</strong> CineApp S.L.</li>
              <li><strong>CIF:</strong> B-12345678</li>
              <li><strong>Domicilio:</strong> Calle del Cine, 7 · 28001 Madrid</li>
              <li><strong>Email:</strong> hola@cineapp.es</li>
            </ul>
          </Section>

          <hr />

          <Section icon="bi-laptop" title="2. Objeto del sitio web">
            <p>CineApp es una plataforma digital dedicada a la difusión, catalogación y valoración de contenido cinematográfico. Los usuarios pueden consultar fichas de películas, valorarlas, comentarlas y organizar sus favoritos.</p>
          </Section>

          <hr />

          <Section icon="bi-person-check" title="3. Condiciones de uso">
            <p>El acceso y uso de este sitio web implica la aceptación de las presentes condiciones. El usuario se compromete a hacer un uso lícito y adecuado de los contenidos y servicios ofrecidos. Queda expresamente prohibido:</p>
            <ul>
              <li>Utilizar el sitio con fines ilícitos o contrarios a la ley.</li>
              <li>Publicar contenidos ofensivos, difamatorios o que vulneren derechos de terceros.</li>
              <li>Realizar cualquier acción que pueda dañar o alterar el funcionamiento del sistema.</li>
            </ul>
          </Section>

          <hr />

          <Section icon="bi-lock" title="4. Protección de datos">
            <p>En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), le informamos de que los datos personales recabados serán tratados por CineApp S.L. con las siguientes finalidades:</p>
            <ul>
              <li>Gestión del registro e identificación de usuarios.</li>
              <li>Personalización de la experiencia en la plataforma.</li>
              <li>Comunicaciones relacionadas con el servicio.</li>
            </ul>
            <p>Los datos no serán cedidos a terceros salvo obligación legal. Puede ejercer sus derechos ARCO dirigiéndose a <strong>hola@cineapp.es</strong>.</p>
          </Section>

          <hr />

          <Section icon="bi-c-circle" title="5. Propiedad intelectual">
            <p>Todos los contenidos del sitio web (textos, imágenes, código, diseño) son propiedad de CineApp S.L. o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o comunicación pública sin autorización expresa.</p>
            <p>Las imágenes de los pósteres de películas son propiedad de sus respectivos estudios y distribuidoras, y se muestran únicamente con fines informativos y divulgativos.</p>
          </Section>

          <hr />

          <Section icon="bi-exclamation-circle" title="6. Limitación de responsabilidad">
            <p>CineApp no garantiza la ausencia de errores en los contenidos ni la disponibilidad continua del servicio. La empresa no se hace responsable de los daños derivados del uso incorrecto del sitio web ni de los contenidos publicados por los usuarios.</p>
          </Section>

          <hr />

          <Section icon="bi-arrow-repeat" title="7. Modificaciones">
            <p>CineApp se reserva el derecho de modificar el presente aviso legal en cualquier momento. Las modificaciones serán publicadas en esta página con indicación de la fecha de actualización.</p>
          </Section>

          <hr />

          <Section icon="bi-geo" title="8. Legislación aplicable">
            <p>Este aviso legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del uso del sitio web, las partes se someten a los Juzgados y Tribunales de la ciudad de Madrid.</p>
          </Section>
        </div>
      </div>
    </div>
  </div>
);

export default LegalPage;