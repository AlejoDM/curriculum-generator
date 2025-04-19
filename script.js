function generarCV() {
    const nombre = document.getElementById("nombre").value;
    const contactos = Array.from(document.querySelectorAll("#contacto-container .item-row"))
                                .map(row => {
                                    const nombre = row.querySelector(".nombre-contacto").value.trim();
                                    const detalle = row.querySelector(".detalle-contacto").value.trim();
                                    return nombre && detalle ? `<strong>${nombre}:</strong> ${detalle}` : null;
                                })
                                .filter(linea => linea !== null)
                                .join("<br>");
    const perfil = document.getElementById("perfil").value;
    const experienciaItems = Array.from(document.querySelectorAll("#experiencia-container .item"))
                              .map(input => input.value)
                              .filter(text => text.trim() !== "");

    const educacionItems = Array.from(document.querySelectorAll("#educacion-container .item"))
                                .map(input => input.value)
                                .filter(text => text.trim() !== "");

    const habilidadesItems = Array.from(document.querySelectorAll("#habilidades-container .item"))
                                .map(input => input.value)
                                .filter(text => text.trim() !== "");
  
    const foto = document.getElementById("foto").files[0];
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgData = e.target.result;
  
      const contenido = `
        <div class="cv-header">
            ${foto ? `<img src="${imgData}" alt="Foto de perfil">` : ''}
            <div>
            <h2>${nombre}</h2>
            <p>${contactos}</p>
            </div>
        </div>

        <div class="cv-section">
            <h3>Perfil</h3>
            <p>${perfil}</p>
        </div>

        ${experienciaItems.length > 0 ? `
            <div class="cv-section">
            <h3>Experiencia Laboral</h3>
            <ul>${experienciaItems.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>` : ""}

        ${educacionItems.length > 0 ? `
            <div class="cv-section">
            <h3>Educación</h3>
            <ul>${educacionItems.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>` : ""}

        ${habilidadesItems.length > 0 ? `
            <div class="cv-section">
              <h3>Habilidades</h3>
              <ul>${habilidadesItems.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>` : ""}
        `;

  
      document.getElementById("cv").innerHTML = contenido;
      document.getElementById("cv-preview").style.display = "block";
    };
  
    if (foto) {
      reader.readAsDataURL(foto); // Esto convierte la imagen en base64 para mostrarla
    } else {
      // Si no cargó foto, igual generamos el CV sin imagen
      const contenido = `
        <h2>${nombre}</h2>
        <p><strong>Email:</strong> ${email} | <strong>Tel:</strong> ${telefono}</p>
        <h3>Perfil</h3><p>${perfil}</p>
        <h3>Experiencia Laboral</h3><p>${experiencia}</p>
        <h3>Educación</h3><p>${educacion}</p>
        <h3>Habilidades</h3><p>${habilidades}</p>
      `;
      document.getElementById("cv").innerHTML = contenido;
      document.getElementById("cv-preview").style.display = "block";
    }
  }
  
  function agregarExperiencia() {
    const container = document.getElementById("experiencia-container");
  
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-row";
  
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Ej: Desarrollador en X - 2021 a 2023";
    input.className = "item";
  
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => itemDiv.remove();
  
    itemDiv.appendChild(input);
    itemDiv.appendChild(removeBtn);
    container.appendChild(itemDiv);
  }
  
  function agregarEducacion() {
    const container = document.getElementById("educacion-container");
  
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-row";
  
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Ej: Ingeniería en Sistemas - Universidad X";
    input.className = "item";
  
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => itemDiv.remove();
  
    itemDiv.appendChild(input);
    itemDiv.appendChild(removeBtn);
    container.appendChild(itemDiv);
  }
  
  function agregarHabilidad() {
    const container = document.getElementById("habilidades-container");
  
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-row";
  
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Ej: JavaScript, Python, SQL...";
    input.className = "item";
  
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => itemDiv.remove();
  
    itemDiv.appendChild(input);
    itemDiv.appendChild(removeBtn);
    container.appendChild(itemDiv);
  }
  
  function agregarContacto() {
    const container = document.getElementById("contacto-container");
  
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-row";
  
    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.placeholder = "Ej: Teléfono / Email / Instagram";
    inputNombre.className = "item nombre-contacto";
  
    const inputDetalle = document.createElement("input");
    inputDetalle.type = "text";
    inputDetalle.placeholder = "Ej: +549123456789 / correo@ejemplo.com / @usuario";
    inputDetalle.className = "item detalle-contacto";
  
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => itemDiv.remove();
  
    itemDiv.appendChild(inputNombre);
    itemDiv.appendChild(inputDetalle);
    itemDiv.appendChild(removeBtn);
    container.appendChild(itemDiv);
  }
  
  function imprimirCV() {
    const element = document.getElementById('cv');  // Elemento con el CV
    const opt = {
        margin:       1,
        filename:     'cv_generado.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}