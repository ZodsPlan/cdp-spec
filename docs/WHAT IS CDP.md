# cdp-spec
Specifications for Controlled Disclosure Protocol

## What is the Controlled Disclosure Packet (CDP)?
The CDP is a self-contained, signed data structure that allows any piece of information — text, image, or other media — to be:

- Authenticated (you can prove its origin)

- Verified (you can prove it hasn’t been altered)

- Disclosed selectively (you can reveal its authorship when required).

## How It Works
1. You create the original content.

2. You attach a tagline (optional).

3. The CDP tool signs the combined content + tagline with your private key.

4. The resulting signature and your public key are added to the CDP.

5. Anyone can verify that the signature came from the matching private key.

## Use Cases
- Protect digital files (art, music, text)

- Maintain attribution and proof of authorship

- Enable delayed or conditional disclosure

- Maintain privacy until you’re ready to reveal authorship

Output Format
- Human-readable text

- Machine-verifiable JSON

- XML (for enterprise or archival environments)

## Intended Audience
- Individuals, organizations, and institutions

- Journalists, researchers, writers, and creators

- Anyone relying on trusted attribution and verification


