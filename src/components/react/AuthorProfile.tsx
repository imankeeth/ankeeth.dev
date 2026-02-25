import React from 'react';
import Panel from './Panel';
import avatarImage from '../../assets/avatar.png';

const AuthorProfile: React.FC = () => (
    <Panel title="AUTHOR" subtitle="TRANSMISSION_SOURCE" noPadding>
        <div className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm border border-gray-200 dark:border-white/10 overflow-hidden shrink-0">
                    <img src={avatarImage.src} className="w-full h-full object-cover grayscale" alt="Author" />
            </div>
            <div>
                <div className="font-mono font-bold text-xs uppercase text-gray-900 dark:text-white">Ankeeth Suvarna</div>
                <div className="text-[10px] text-accent-teal font-mono mt-0.5">Founder & CTO @ The AI Leverage</div>
            </div>
        </div>
    </Panel>
);

export default AuthorProfile;





