import { PrismaClient } from '@prisma/client';
import { cloneDeep } from 'lodash';

const prisma = new PrismaClient();

async function main() {
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.log(error);
		await prisma.$disconnect();
	});
