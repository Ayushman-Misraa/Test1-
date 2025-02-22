// Chat functionality module
import { UserManager } from './user.js';
import { PeerManager } from './peer.js';
import { ChatUI } from './ui.js';

export const ChatManager = {
    initialize() {
        this.setupEventListeners();
        ChatUI.showLoadingScreen();
    },

    setupEventListeners() {
        // User Setup
        document.getElementById('start-chat').addEventListener('click', this.handleUserSetup.bind(this));

        // Chat Options
        document.getElementById('private-chat').addEventListener('click', () => ChatUI.showScreen('private-chat-screen'));

        // Private Chat
        document.getElementById('connect-peer').addEventListener('click', () => {
            const peerId = document.getElementById('peer-id-input').value;
            PeerManager.connectToPeer(peerId);
        });

        document.getElementById('send-private').addEventListener('click', this.sendPrivateMessage.bind(this));

        // Message input enter key handling
        document.getElementById('private-msg-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendPrivateMessage();
        });
    },

    handleUserSetup() {
        const displayName = document.getElementById('display-name').value.trim();
        if (!displayName) {
            alert('Please enter a display name');
            return;
        }

        UserManager.setCurrentUser(displayName);
        PeerManager.initializePeer();
        ChatUI.showScreen('chat-options');
    },

    sendPrivateMessage() {
        const input = document.getElementById('private-msg-input');
        const message = input.value.trim();
        
        if (message) {
            PeerManager.sendMessage(message);
            input.value = '';
        }
    }
};