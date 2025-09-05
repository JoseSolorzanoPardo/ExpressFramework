const Sucursal = require("../Models/sucursal.model");
const SucursalEliminada = require("../Models/sucursalEliminada.model");

// GET: Obtener todas las sucursales ordenadas por fecha de creación (más reciente primero)
exports.getAll = async (req, res) => {
  try {
    const sucursales = await Sucursal.find().sort({ createdAt: -1 });
    res.json(sucursales);
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// POST: Crear una nueva sucursal
exports.create = async (req, res) => {
  try {
    const { nombre, direccion, ciudad, telefono, estado } = req.body;

    // Validación básica de campos obligatorios
    if (!nombre || !direccion || !ciudad) {
      return res.status(400).json({ message: 'nombre, direccion y ciudad son obligatorios' });
    }

    // Crear una nueva instancia del modelo Sucursal
    const nuevaSucursal = new Sucursal({
      nombre,
      direccion,
      ciudad,
      telefono,
      estado
    });

    // Guardar en la base de datos
    const sucursalGuardada = await nuevaSucursal.save();
    res.status(201).json(sucursalGuardada);
  } catch (error) {
    console.error('Error al crear sucursal:', error);
    if (error.code === 11000) {
      // Error por nombre duplicado (índice único violado)
      return res.status(409).json({ message: 'El nombre de la sucursal ya existe' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// PUT: Actualizar una sucursal existente por ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, ciudad, telefono, estado } = req.body;

    // Validación básica
    if (!nombre || !direccion || !ciudad) {
      return res.status(400).json({ message: 'nombre, direccion y ciudad son obligatorios' });
    }

    // Buscar por ID y actualizar
    const sucursalActualizada = await Sucursal.findByIdAndUpdate(
      id,
      { nombre, direccion, ciudad, telefono, estado },
      { new: true, runValidators: true }
    );

    if (!sucursalActualizada) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    res.json(sucursalActualizada);
  } catch (error) {
    console.error('Error al actualizar sucursal:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'El nombre de la sucursal ya existe' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// DELETE: Eliminar una sucursal y respaldarla en otra colección
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la sucursal original
    const sucursal = await Sucursal.findById(id);
    if (!sucursal) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    // Crear un respaldo en la colección SucursalEliminada
    const copia = new SucursalEliminada({
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      ciudad: sucursal.ciudad,
      telefono: sucursal.telefono,
      estado: sucursal.estado,
      createdAt: sucursal.createdAt
    });

    await copia.save(); // Guardar respaldo

    await Sucursal.findByIdAndDelete(id); // Eliminar del original

    res.json({ message: 'Sucursal eliminada y respaldada correctamente' });
  } catch (error) {
    console.error('Error al eliminar y respaldar sucursal:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
