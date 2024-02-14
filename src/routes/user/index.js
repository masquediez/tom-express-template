const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// Simulación de base de datos de perfiles de usuario
let profiles = [
  {
    id: 1,
    firstName: "Max",
    name: "Mustermann",
    birthDate: new Date("1990-10-10"),
    members: [], // Array para almacenar los IDs de los miembros asociados al usuario
  },
  {
    id: 2,
    firstName: "Nina",
    name: "Mustermann",
    birthDate: new Date("1980-10-10"),
    members: [],
  },
];

const UserRouter = Router();

// Obtener perfil de un usuario específico
UserRouter.get("/profile", (req, res) => {
  const userId = parseInt(req.query.userId);
  if (!userId || isNaN(userId)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
    return;
  }
  const userProfile = profiles.find((item) => item.id === userId);
  if (!userProfile) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
    return;
  }
  res.status(StatusCodes.OK).json({ profile: userProfile });
});

// Actualizar perfil de usuario
UserRouter.put("/profile/update", (req, res) => {
  const { username, userId } = req.body;

  if (!username || !userId || isNaN(userId)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
    return;
  }

  const currentUser = profiles.find((item) => item.id === userId);
  if (!currentUser) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
    return;
  }

  currentUser.username = username;
  res.status(StatusCodes.OK).json({ updatedProfile: currentUser });
});

// Eliminar perfil de usuario
UserRouter.delete("/profile", (req, res) => {
  const { userId } = req.body;

  if (!userId || isNaN(userId)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
    return;
  }

  const index = profiles.findIndex((item) => item.id === userId);
  if (index === -1) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
    return;
  }

  profiles.splice(index, 1);
  res.status(StatusCodes.OK).json({ deletedUserId: userId });
});

// Rutas para gestionar miembros de usuario
// Agregar miembro a un usuario
UserRouter.post("/add/member", (req, res) => {
  const { userId, memberId } = req.body;

  const currentUser = profiles.find((item) => item.id === userId);
  if (!currentUser) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
    return;
  }

  // Verificar si el memberId ya está asociado al usuario
  if (currentUser.members.includes(memberId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "El miembro ya está asociado a este usuario." });
  }

  // Agregar el memberId al usuario
  currentUser.members.push(memberId);
  res
    .status(StatusCodes.OK)
    .json({ message: "Miembro agregado exitosamente al usuario." });
});

// Eliminar miembro de un usuario
UserRouter.delete("/remove/member", (req, res) => {
  const { userId, memberId } = req.body;

  const currentUser = profiles.find((item) => item.id === userId);
  if (!currentUser) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
    return;
  }

  // Verificar si el memberId está asociado al usuario
  const memberIndex = currentUser.members.indexOf(memberId);
  if (memberIndex === -1) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "El miembro no está asociado a este usuario." });
  }

  // Eliminar el memberId del usuario
  currentUser.members.splice(memberIndex, 1);
  res
    .status(StatusCodes.OK)
    .json({ message: "Miembro eliminado exitosamente del usuario." });
});

module.exports = { UserRouter };
