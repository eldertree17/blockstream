import { TonConnect } from '@tonconnect/sdk';

const tonConnect = new TonConnect({
    manifestUrl: 'https://your-app-url.com/tonconnect-manifest.json'
});

async function connectWallet() {
    try {
        const wallet = await tonConnect.connect();
        console.log('Wallet connected:', wallet);
        document.getElementById('send-transaction-button').style.display = 'block';
        document.getElementById('disconnect-button').style.display = 'block';
        document.getElementById('convert-address-button').style.display = 'block';
    } catch (error) {
        console.error('Failed to connect wallet:', error);
    }
}

document.getElementById('connect-button').addEventListener('click', connectWallet);

window.onload = async () => {
    // Fetch the wallets list
    const walletsList = await tonConnect.getWallets();
    console.log(walletsList); // Debugging: see fetched wallets

    // Display the wallets options
    displayWalletOptions(walletsList);
};

// Function to show QR code (this is a placeholder, implement QR generation logic)
function showQRCode(link) {
    const qrCodeDiv = document.getElementById('qr-code');
    qrCodeDiv.style.display = 'block';
    qrCodeDiv.innerHTML = `<p>Scan this QR code:</p><a href="${link}">${link}</a>`;
}

// Subscribe to connection status changes
tonConnect.onStatusChange(walletInfo => {
    console.log('Connection status updated:', walletInfo);
    // Update UI based on new wallet info
});

// Function to send a transaction (you can call this after connecting)
async function sendTransaction() {
    if (!tonConnect.connected) {
        alert('Please connect wallet to send the transaction!');
        return;
    }

    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // valid for 60 seconds
        messages: [
            {
                address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
                amount: "20000000",
            },
            {
                address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
                amount: "60000000",
            }
        ]
    };

    try {
        const result = await tonConnect.sendTransaction(transaction);
        alert('Transaction was sent successfully');
    } catch (e) {
        if (e instanceof UserRejectedError) {
            alert('You rejected the transaction. Please confirm it to send to the blockchain');
        } else {
            alert('Unknown error happened', e);
        }
    }
}

// Event listener for send transaction button
document.getElementById('send-transaction-button').addEventListener('click', sendTransaction);

function displayWalletOptions(walletsList) {
    const walletContainer = document.createElement('div');
    walletContainer.id = 'wallet-options';
    
    walletsList.forEach(wallet => {
        const walletButton = document.createElement('button');
        walletButton.innerHTML = `<img src="${wallet.imageUrl}" alt="${wallet.name} icon" /> ${wallet.name}`;
        
        walletButton.onclick = () => handleWalletSelection(wallet);
        walletContainer.appendChild(walletButton);
    });

    document.body.appendChild(walletContainer);
}

async function handleWalletSelection(walletInfo) {
    const { 
        isWalletInfoRemote, 
        isWalletInfoCurrentlyInjected 
    } = await import('@tonconnect/sdk');

    if (isWalletInfoRemote(walletInfo)) {
        await tonConnect.connect({
            universalLink: walletInfo.universalLink,
            bridgeUrl: walletInfo.bridgeUrl
        });
    } else if (isWalletInfoCurrentlyInjected(walletInfo)) {
        await tonConnect.connect({
            jsBridgeKey: walletInfo.jsBridgeKey
        });
    } else {
        console.error('Unsupported wallet type');
    }
}

// Function to convert raw address to user-friendly format
async function convertAddress() {
    if (!tonConnect.connected) {
        alert('Please connect wallet before converting address!');
        return;
    }

    const rawAddress = tonConnect.wallet.account.address; // Get raw address from connected wallet
    const userFriendlyAddress = toUserFriendlyAddress(rawAddress); // Convert to user-friendly format

    // Display user-friendly address
    document.getElementById('user-friendly-address').innerHTML = 
        `<p>User-Friendly Address: ${userFriendlyAddress}</p>`;
    
    // Optionally, convert for testnet only
    const testnetOnlyAddress = toUserFriendlyAddress(rawAddress, true);
    console.log(`Testnet Only Address: ${testnetOnlyAddress}`); // Log or handle as needed
}

document.getElementById('convert-address-button').addEventListener('click', convertAddress);

// Additional functions and event listeners
const videos = [
    { title: "My Favorite Movie" },
    { title: "Blockbuster Hit" },
    { title: "Classic Film" },
    { title: "Top Chart Buster" },
    { title: "Must-Watch Series" },
    { title: "Latest Release" }
];

function searchVideos() {
    const query = document.querySelector('#search input').value.toLowerCase();
    const resultsContainer = document.querySelector('#search .videos');
    
    // Clear previous results
    resultsContainer.innerHTML = '';

    // Filter videos based on the query
    const results = videos.filter(video => video.title.toLowerCase().includes(query));

    // Display results
    results.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `<p>${video.title}</p>`;
        resultsContainer.appendChild(videoElement);
    });
}

function navigateToSearch() {
    window.location.href = 'search.html'; // Redirects to search.html
}

function showPage(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.classList.remove('active'); // Hide all pages
    });
    document.getElementById(page).classList.add('active'); // Show selected page
}

function showTab(tab) {
    const partnerTab = document.getElementById('partner');
    const blockstreamTab = document.getElementById('blockstream');
    const tabs = document.querySelectorAll('.tab');

    if (tab === 'partner') {
        partnerTab.style.display = 'block';
        blockstreamTab.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        partnerTab.style.display = 'none';
        blockstreamTab.style.display = 'block';
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

function showLeaderboardTab(tab) {
    const contents = document.querySelectorAll('.leaderboard-content');
    contents.forEach(content => {
        content.classList.remove('active'); // Hide all tabs
    });
    document.getElementById(tab).classList.add('active'); // Show selected tab

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => {
        t.classList.remove('active'); // Remove active class from all tabs
    });
    const activeTab = Array.from(tabs).find(t => t.textContent.trim().toLowerCase() === tab);
    if (activeTab) {
        activeTab.classList.add('active'); // Set active class on selected tab
    }
}