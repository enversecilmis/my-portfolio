/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PUSHER_APP_ID: string,
            PUSHER_APP_KEY: string,
            PUSHER_APP_SECRET: string,
            PUSHER_APP_CLUSTER: string
        }
    }
}