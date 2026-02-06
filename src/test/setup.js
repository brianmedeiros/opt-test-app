// src/test/setup.js

import '@testing-library/jest-dom';

// jsdom already provides localStorage, so we don't need to mock it
// Just ensure it's cleared before tests if needed
// (We'll do this in individual test files with beforeEach)
