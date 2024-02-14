const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const MemberRouter = (updateUserProfiles) => {
  const router = Router();

  // Agregar miembro a un usuario
  router.post("/add", (req, res) => {
    const { userId, memberId } = req.body;

    // Verificar si se proporcionaron los parámetros necesarios
    if (!userId || !memberId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Se requieren userId y memberId." });
    }

    // Lógica para agregar un miembro
    const currentUser = updateUserProfiles(userId, (profile) => {
      profile.members.push(memberId);
      return profile;
    });

    // Manejo de errores
    if (!currentUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ReasonPhrases.NOT_FOUND });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Miembro agregado exitosamente al usuario." });
  });

  // Eliminar miembro de un usuario
  router.delete("/remove", (req, res) => {
    const { userId, memberId } = req.body;

    // Verificar si se proporcionaron los parámetros necesarios
    if (!userId || !memberId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Se requieren userId y memberId." });
    }

    // Lógica para eliminar un miembro
    const currentUser = updateUserProfiles(userId, (profile) => {
      profile.members = profile.members.filter((id) => id !== memberId);
      return profile;
    });

    // Manejo de errores
    if (!currentUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ReasonPhrases.NOT_FOUND });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Miembro eliminado exitosamente del usuario." });
  });

  // Obtener miembros de un usuario
  router.get("/list", (req, res) => {
    const { userId } = req.query;

    // Verificar si se proporcionó el parámetro necesario
    if (!userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Se requiere userId." });
    }

    // Obtener el perfil de usuario
    const userProfile = profiles.find(
      (profile) => profile.id === parseInt(userId)
    );

    // Manejo de errores
    if (!userProfile) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ReasonPhrases.NOT_FOUND });
    }

    res.status(StatusCodes.OK).json({ members: userProfile.members });
  });

  return router;
};

module.exports = { MemberRouter };
