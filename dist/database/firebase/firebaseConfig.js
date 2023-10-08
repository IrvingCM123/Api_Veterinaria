"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAdmin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        projectId: "biblioteca-f2285",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCMB5XyraKp5rXA\nBsOVZWwHIcWj1UiotL0TROIu4BBiJCbT4uev/LhQphO1ZtIJhgkLNyi3p77huFeO\nNfP4+h9Pa8pQC1kCPhSNN83YA+emGYIYKE5B4B8UtFJQ0H9r6nuH45Ak6qotSfCo\nVxMMKFtQOjo0YANoiIdJCeDeBeozFP0G0gLq1/R4W5qLv5ckZn8+GFVVFkWeypsg\nHADEMdHnFrt9CphLewVtkf4SS/gn1DcDRqa4/EM9FB4jKYs7iOiEFDTngRWB2ufb\nQVIBdgpQSSl9k1uNIE78BboCYnOBCil+48LEsOUWi/Xwct2y0ufBaS23QkfblQVi\nWRJVJvYtAgMBAAECggEAKW/nOgiS3aclen0l7HQ2Wwft5fTsCuxtFSIpsohgoMIk\n8Uewmv30hv0WUPRrzCCrVXPNq0dK752u3yjtGOzfTg/OLxCklsrLJxzv33AMYTUk\nL8Thn5HUcLqJr1t7kXIyevxmv93nXP6H5jDaNJtOpjeM2MneyFS6f+0Z62mhq9qm\nlQVzC8sVHlKbXD7Ado1yEPb7kfFKQwqG4sEu6dzDxcdzmzh8LIz0joQwvo9v/G1t\n2x/YntUa7+YxMNgb42J9QApEjj98UuNyd42hsb9lI1zVoxsLx/ktEzAxSkRCKbmY\nDVZ1W+QmTXkjzeviGRs+HOxxLt+MVWt4Mle6/f9cWwKBgQC9/NZj8q0kGMO7DLcR\nktCltZi4+cJZt7nbIdi/IrqXEtbiRg+6m1GOPbeO6XZJ+veaLuocBvTkEU5Edb1b\nzOn8kE3maZpMor0Mq+68I+xIdB1QZITYh2L30v0ffpl7Tk7JukcX6lTesIGhaj3p\nckAvaojuIAFhYsgDICLjYZvOdwKBgQC8rwutobkv2+kjZNeoeQ3F2/1em1MgdIkr\nsNQv1Fttnd4pRAVISxQ34PBIq7TnRmEKdsMZKER6nvaroLGMvr+LYONYk52OF5+f\npsi0fC2Z06Ttg09hK4T5fHS6PgOjoXPgq3p9PccEeEA8jTvI9kVPhSsvYiA4X6Fk\nvD/Xcz0VewKBgB27Q5HAmHfdqEPNaZjGcQB9uri33UJNDjjMwy6mMK0Tta0TacK6\nK7kmz2L+BhTtwXHPhbN9IzXNv4HXKxsCpltv+cDlJdB4Zz1kaqfmt0NfaHb8RA3e\nog5GZnZXSY2SY6IOFLIZac6vsJmiFq5BwumosmURfSXQX5ydmtganldhAoGActJr\nXuyNz4waIknZ21JfiUrIs2v+eD+ywf3IAptOUDTD34TfWhEmaqLeVrr3Sc7Qexeu\nvn58vcpC/kq6AZaK5fy+HUcnmDLUFsneVcdD0Nq1ATzpb46WS2Tre/MFL+yuoch4\nsAKKPDQZkz+3ZCJKJ4w4rYsfZG79vlm42Bnu0EUCgYEApmA8Q1Bs+enHWOJUcuNF\nARXoAWdBVyvA6UQ5hdj8r0g2131PqV8WGQtN6/mSBJ8/JJXCMygf1oc5z4127l8t\nFzB3fatohGibKgwXVz4Azh+bR9CEKQ+PPdzIxATjBoWICYusDxGW1Gin1vj7FAs6\nOMciiOjHEs7qSp/sqdFDkkY=\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-adh60@biblioteca-f2285.iam.gserviceaccount.com",
    }),
});
exports.firebaseAdmin = firebase_admin_1.default;
