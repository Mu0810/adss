const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from current directory
app.use(express.static(path.join(__dirname, '.')));

// Route all requests to appropriate files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/guides', (req, res) => {
    res.sendFile(path.join(__dirname, 'guides.html'));
});

app.get('/tools', (req, res) => {
    res.sendFile(path.join(__dirname, 'tools.html'));
});

app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, 'resources.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/affiliate', (req, res) => {
    res.sendFile(path.join(__dirname, 'affiliate.html'));
});

app.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'privacy-policy.html'));
});

// Handle 404s
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`EarnWeb server running on port ${PORT}`);
});
