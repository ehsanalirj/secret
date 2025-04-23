import React from 'react';

import LiveChatPanel from './LiveChatPanel';
import PresenceSocketProvider, { usePresence } from './PresenceSocketProvider';
import PresenceIndicatorBar from '../components/PresenceIndicatorBar';

function PanelContent() {
  const { users } = usePresence();
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Collaboration & Real-Time Editing</h2>
      <p className="text-blue-800 mb-4">Collaborate live with your team: multi-user editing, comments, tasks, whiteboard, and activity log.</p>
      <PresenceIndicatorBar users={users} />
      <div className="bg-white rounded-xl shadow p-6 mb-6">No collaborators online. Invite your team!</div>
      <LiveChatPanel username={"Admin"} />
    </div>
  );
}

export default function CollaborationPanel() {
  return (
    <PresenceSocketProvider username={"Admin"}>
      <PanelContent />
    </PresenceSocketProvider>
  );
}
