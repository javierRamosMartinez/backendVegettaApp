import User from '@/models/User';
import Game from '@/models/Game';
import connectMongo from '@/utils/connectMongo';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await connectMongo();

        const userId = req.body.userId;
        const { gameId } = req.query;

        try {
            const user = await User.findById(userId);
            const game = await Game.findById(gameId);

            if (!user || !game) {
                return res.status(404).json({ message: "Usuario o juego no encontrado" });
            }

            if (user.remainingVotes === 0) {
                return res.status(400).json({ message: "No tienes más votos disponibles" });
            }

            const alreadyVoted = user.votedGames.find(vote => vote.gameId.toString() === gameId);

            if (alreadyVoted) {
                return res.status(400).json({ message: "Ya votaste por este juego" });
            }

            game.votes += 1;
            await game.save();

            user.votedGames.push({ gameId });
            user.remainingVotes -= 1;
            await user.save();

            return res.status(200).json({ message: "Voto registrado", game });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al votar" });
        }
    } else {
        return res.status(405).json({ message: "Método no permitido" });
    }
}
