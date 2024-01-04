import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

const PORT = 4000;
const APP_URL = `http://localhost:${PORT}`;

describe('App e2e', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	beforeAll(async () => {
		const moduleRef = Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = (await moduleRef).createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
		await app.init();
		await app.listen(PORT);

		prisma = app.get(PrismaService);
		// await prisma.cleanDb();
		pactum.request.setBaseUrl(APP_URL);
		pactum.request.setDefaultTimeout(5000);
	});

	afterAll(() => app.close());

});
