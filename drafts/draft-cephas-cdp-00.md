---
title: Controlled Disclosure Protocol (CDP)
abbrev: CDP
docname: draft-cephas-cdp-00
category: info
author:
  - name: Emmanuel Cephas Jr.
    email: contact@humanstorm.io
date: 2025-06
---

# Controlled Disclosure Protocol (CDP)

## Abstract
The Controlled Disclosure Protocol (CDP) is a data structure and process that allows any party to assert authorship of a digital artifact using a cryptographic signature. This document describes the schema and operational considerations for CDP in JSON and XML formats.

## 1. Introduction
CDP allows an entity to attach a signature and (optionally) a hash to any piece of digital content. The signature can be used for:

- Verifying authorship
- Establishing attribution
- Establishing trust across digital platforms
- Creating verifiable connections between digital works and their authors

## 2. Terminology
- **Content**: The original data (text, media).
- **Signature**: A cryptographic proof created using a private key.
- **Public Key**: The public identifier used for verifying the signature.
- **Hash**: A digest of the original content.

## 3. CDP JSON Schema
See: [specs/cdp.schema.json](../specs/cdp.schema.json)

## 4. CDP XSD Schema
See: [specs/cdp.schema.xsd](../specs/cdp.schema.xsd)

## 5. Example
Refer to [examples/sample-cdp.json](../examples/sample-cdp.json)

## 6. Security Considerations
- Signatures must be generated and kept secure.
- Optional hash fields may be used when referencing external content.
- Not intended for use as an encryption mechanism.

## 7. IANA Considerations
This memo includes no request for IANA action.

## 8. Acknowledgments
The author thanks collaborators and the open source community.

## 9. Author(s)**  
Emmanuel Cephas Jr.  
Human Storm LLC (https://humanstorm.io)  
Email: contact@humanstorm.io  