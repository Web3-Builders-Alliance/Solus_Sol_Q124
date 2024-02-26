import wallet from './wallet/wba-wallet.json'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
	createGenericFile,
	createSignerFromKeypair,
	signerIdentity,
} from '@metaplex-foundation/umi'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { readFile } from 'fs/promises'

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com')

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet))
const signer = createSignerFromKeypair(umi, keypair)

umi.use(irysUploader())
umi.use(signerIdentity(signer))
;(async () => {
	try {
		//1. Load image
		const image = await readFile('./rug.png')

		//2. Convert image to generic file.
		const rugFile = createGenericFile(image, './rug.png')

		//3. Upload image
		const rugUri = await umi.uploader.upload([rugFile])

		console.log('image uri: ', rugUri)
		console.log('image uri: ', rugUri)
	} catch (error) {
		console.log('Oops.. Something went wrong', error)
	}
})()
