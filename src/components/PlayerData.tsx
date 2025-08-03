import { useState, useEffect } from 'react';
import type {PlayerStats} from "../types.ts";


const loadPlayerData = (playerName: string) => {
    const raw = localStorage.getItem(`player:${playerName}`);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

const PlayerData = () => {
    const [playerName, setPlayerName] = useState('');
    const [playerStats, setPlayerStats] = useState<PlayerStats | undefined>();

    useEffect(() => {
        if (playerName.trim() !== '') {
            const data = loadPlayerData(playerName.trim());
            setPlayerStats(data);
        } else {
            setPlayerStats(undefined);
        }
    }, [playerName]);

    return (
        <>
            <label htmlFor="name-input">Enter your name:</label>
            <input
                id="name-input"
                className="text-input"
                type="text"
                placeholder="Your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />

            {playerName.trim() !== '' && (
                <div className="welcome-message">
                    {playerStats ? (
                        <p>
                            Welcome back, <strong>{playerName}</strong>!<br />
                            Your last result was <strong>{playerStats.lastScore}</strong>. <br />
                            Your best result was <strong>{playerStats.highestScore}</strong>.<br />
                            What about a new game?
                        </p>
                    ) : (
                        <p>
                            Welcome, <strong>{playerName}</strong>! What about a game?
                        </p>
                    )}
                </div>
            )}
        </>
    );
};

export default PlayerData;
