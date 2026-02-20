export const ISSUE_CATEGORIES: Record<string, Record<string, string[]>> = {
  "Electrónica y Tecnología": {
    "Televisor": ["Pantalla (píxeles muertos, golpes)", "Mando a distancia (botones, pilas)", "Soporte de pared"],
    "Aire acondicionado / Termostato": ["Filtros sucios (mal olor)", "Fugas de agua", "Mando sin pilas", "Sensor de temperatura"],
    "Secador de pelo": ["Sobrecalentamiento", "Enganche roto", "Cable pelado"],
    "Caja fuerte": ["Batería agotada", "Teclado numérico falla", "Mecanismo atascado"],
    "Teléfono": ["Auricular cable cortado", "Teclas no responden", "Interferencias"],
    "Despertador / Altavoz": ["Pantalla fundida", "Altavoz roto", "Puerto de carga dañado"],
    "Lámparas": ["Bombilla fundida", "Interruptor roto", "Cable pelado", "Pantalla abollada/rota"],
    "Enchufes y USB": ["Enchufes sueltos", "USB no carga", "Tapas rotas"]
  },
  "Fontanería y Baño": {
    "Inodoro / WC / Váter": ["Pérdida de agua", "Botón roto/atascado", "Tapa agrietada/suelta", "Atascos"],
    "Ducha / Bañera": ["Cabezal obstruido/roto", "Manguera gotea", "Mampara rota/descarrilada", "Silicona mal estado", "Desagüe lento"],
    "Lavabo": ["Grifo gotea/poca presión", "Desagüe lento/atascado", "Sifón con fuga", "Pedestal roto"],
    "Accesorios": ["Toallero suelto", "Jaboneras rotas", "Porta-rollos desprendido"]
  },
  "Mobiliario": {
    "Camas": ["Somier roto/cruje", "Patas flojas/rotas", "Cabecero despegado"],
    "Colchones y Almohadas": ["Hundimientos", "Manchas", "Quemaduras", "Pérdida de forma"],
    "Armario": ["Puertas descuadradas", "Cajones no corren", "Barras rotas", "Perchas rotas"],
    "Escritorio / Mesa": ["Patas cojas", "Superficie rayada/quemada", "Tiradores rotos"],
    "Sillas y Butacas": ["Patas flojas", "Tapicería rota/manchada", "Respaldo suelto", "Ruedas rotas"],
    "Mesillas de noche": ["Cajones rotos", "Superficie dañada", "Lámpara fundida"],
    "Equipaje": ["Bisagras rotas", "Tapa no se sostiene"]
  },
  "Estructura y Acabados": {
    "Ventanas / Puertas": ["Manivelas rotas/flojas", "Cierre no ajusta", "Guías descarriladas", "Cristales rotos"],
    "Cortinas y Estores": ["Anillas rotas", "Cadena/tirador roto", "Tela desgarrada/descolgada"],
    "Puerta de entrada": ["Cerradura (pilas)", "Mirilla tapada", "Cadena rota", "Bisagras chirrían"],
    "Paredes": ["Golpes", "Desconchones", "Humedades"],
    "Suelo": ["Baldosas rotas", "Tarima levantada/rayada", "Rodapiés despegados"],
    "Techos": ["Filtraciones (manchas)", "Lámparas fundidas/rotas"]
  },
  "Otros Elementos": {
    "Pomos y Tiradores": ["Flojos o salidos"],
    "Interruptores": ["No encienden", "Flojos", "Tapa rota"],
    "Espejos": ["Roturas", "Azogado (manchas)", "Soportes sueltos"],
    "Puntos de Recarga": ["USB-C pared roto/obsoleto"],
    "Portero / Videoportero": ["Pantalla rota", "Audio no funciona"],
    "Minibar": ["Puerta no cierra", "Motor ruidoso", "Estantes rotos"]
  }
};

export const getAllIssues = () => {
  const issues: string[] = [];
  Object.entries(ISSUE_CATEGORIES).forEach(([category, items]) => {
    Object.entries(items).forEach(([item, problems]) => {
      problems.forEach(problem => {
        issues.push(`${item}: ${problem}`);
      });
    });
  });
  return issues;
};
