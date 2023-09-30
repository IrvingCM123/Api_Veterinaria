"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAdmin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        projectId: "veterinaria-75bd6",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmbKsswaLueXJu\nkjA+RWNqFUz2nyZ8QcQX7B5pl8x8TDOi4ks0hHAsGvKSg3yGLQoFSrrzuhx5ha4f\nwU/50njUz9qm4bHrhMBEh7zGbfvmyN0Ans9WqSwZqZEvf5GdHJw6XqfuA9vUrfOp\nIOkSmjZYwXrKFRbk5u6HglpGrJKBVzRXXkHTd7R4z4gNLj8TAke3lokBJCVsN5A8\nodS62JC9Sp6B4BR0jwDP8Q6pKAhEOtlj2j8/ADvJI0xKQSdmJ5rGwki/yeEZYNop\nCt/YbjfNQWqKSnd8S2cuTxcY8uYV4naEc2KZemaPcoYLINvvQX6hO5Dje9PsJldI\n1nWKUBYLAgMBAAECggEAOlN+gG6SxEJTDRZ2CvT1nRG/CfYIHmdMKtgpZnd5hpyM\nQktN8SdzSrndBuVHKJ0zVFx2/gFdhmeH+YAeH9+YUnlQV8lkujapzbrGucKFFMKT\n1epSnzwmBQ5tIDj01xvWUwymjR/UFQssCLvMg6UBZATXHGjcv7eBpINWUUudAu/0\n50fbEXW7X3mek1E9H2TZj3U3/oveQb/Uw+VOVu3sJVn+JOuNmsP1WeVZCYH6z9uI\nfILpk3vdO80CHcjp5CwbpwNIN9MlV891CG7hR0y/x9aqPydI5khKrk9509YpIVae\n+/LUFKUqBtPgCLlFx/PDIcJX63PPBSloUxvlrGxUtQKBgQDSK7Z4sUGHnJSCk6i3\neqaPiXRBHV+1yYXCwl7NyUwvRcO9f43dTz0l87um/B/BHIEa+ApgPvvuOT16pk64\nLHWPKmuf4zOA9IE0T3g+c0YFhGDSzHoXxEN2l6j8+KoUM5fKCSaV4DbhYvKrTkki\nFTyqiKJs19gZXZOqTkndNUUY5wKBgQDKtuxx4xzK8tWInZ54Beu6XICioSU7rEdj\nkCPZmDq4jmyWFrF7pjanDRBGGeGMdJOu2aBKBEOUjBa6JzWm+DnEu91nKYLOst8/\nlANwdTwAXiCQAiRvJjtjhZPTv6mame5W1Oy2WVdUbDFP7wAfntn3fp11MD1Pq4Tm\nVwGBNPXBPQKBgQClp97DcrN7+Gb2JPyu4fW23VjMmiJ+XsEXqayf9zIdcJfAHXHs\nJjDEYUBfdgpxY84/O5KyGfLo6iUTL1KMyD5BAeait6o40n+kg577WlCuuJC4loMF\niKTELPX9ruIf2iqiDGRlbbzUGfG8JJBwVNzkbZ3YvKiQFbn2Wo7N1NcJsQKBgQCv\nNqjsT0ely3rx2HsOdt+ndyjgaLTL/T6/OekivMeUmdYVbIv/ukzm2w3D6b7gLisw\nKH65OzJGhUdno1hmd4tHFrJp5qFfk5APXhoS6+Hu120BzDg9sigG/4AkuDcaoA44\nE1Z+zn4DRHjjBEtxCVaQ62mhzw5PfIskpPNyAJqiaQKBgBDVVOJWQO4gH5ExZPqd\n54Zi7d5a7sQNpubo7iX4eDZ4gg59sT4vV/a6T84MIjZ4S5tjEnM9NWaH9ZV2FWRD\ncYv5Cc5w8VfI2rtUKM+svs8iwglpGIHsaRIPXylC6h13Fv53+lLYW47g+S3HjKyr\nnsPzbS1p1FTtWv/edLS2j+Hy\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-n7w0e@veterinaria-75bd6.iam.gserviceaccount.com",
    }),
});
exports.firebaseAdmin = firebase_admin_1.default;
