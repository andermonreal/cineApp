import React, { useState } from 'react';

const ContactPage = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 72, height: 72 }}>
              <i className="bi bi-envelope-heart text-primary fs-2"></i>
            </div>
            <h2 className="fw-bold">Contacta con nosotros</h2>
            <p className="text-muted">Estamos aquí para ayudarte. Escríbenos y te responderemos en menos de 48 horas.</p>
          </div>

          <div className="row g-4 mb-5">
            {/* Info cards */}
            {[
              { icon: 'bi-envelope', color: 'primary', title: 'Email', value: 'hola@cineapp.es' },
              { icon: 'bi-telephone', color: 'success', title: 'Teléfono', value: '+34 900 123 456' },
              { icon: 'bi-geo-alt', color: 'danger', title: 'Dirección', value: 'Calle del Cine, 7 · Madrid' },
            ].map((item) => (
              <div key={item.title} className="col-md-4">
                <div className="card border-0 shadow-sm text-center p-4 h-100">
                  <div className={`bg-${item.color} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3`} style={{ width: 52, height: 52 }}>
                    <i className={`bi ${item.icon} text-${item.color} fs-5`}></i>
                  </div>
                  <h6 className="fw-bold">{item.title}</h6>
                  <p className="text-muted mb-0 small">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="card border-0 shadow-sm p-4 p-md-5">
            {submitted ? (
              <div className="text-center py-4">
                <i className="bi bi-check-circle text-success fs-1 d-block mb-3"></i>
                <h5 className="fw-bold">¡Mensaje enviado!</h5>
                <p className="text-muted">Gracias por escribirnos. Te responderemos en breve.</p>
                <button className="btn btn-primary btn-sm" onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', subject: '', message: '' }); }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h5 className="fw-bold mb-4">Envíanos un mensaje</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Nombre completo</label>
                    <input name="name" type="text" className="form-control" placeholder="Tu nombre" value={formState.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Correo electrónico</label>
                    <input name="email" type="email" className="form-control" placeholder="tu@email.com" value={formState.email} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Asunto</label>
                    <input name="subject" type="text" className="form-control" placeholder="¿En qué podemos ayudarte?" value={formState.subject} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Mensaje</label>
                    <textarea name="message" className="form-control" rows={5} placeholder="Escribe tu mensaje aquí..." value={formState.message} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary fw-semibold px-4">
                      <i className="bi bi-send me-2"></i>Enviar mensaje
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;