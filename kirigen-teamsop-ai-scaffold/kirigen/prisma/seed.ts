/**
 * Seeds a demo organization, team, users and one sample SOP.
 * Run with: pnpm db:seed
 */
import { PrismaClient, Role, SopStatus, SourceType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.upsert({
    where: { slug: 'demo-org' },
    update: {},
    create: {
      name: 'Demo Org',
      slug: 'demo-org',
      plan: 'pro',
    },
  });

  const team = await prisma.team.create({
    data: {
      name: 'Operations',
      orgId: org.id,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo.dev' },
    update: {},
    create: {
      email: 'admin@demo.dev',
      name: 'Ada Admin',
      passwordHash: 'CHANGE_ME_HASH', // replace with a real bcrypt hash before use
      memberships: {
        create: { teamId: team.id, role: Role.ADMIN },
      },
    },
  });

  await prisma.sOP.create({
    data: {
      title: 'Client Onboarding',
      content: '# Client Onboarding\n\n1. Send welcome email\n2. Schedule kickoff call\n3. Create shared workspace',
      status: SopStatus.PUBLISHED,
      sourceType: SourceType.MANUAL,
      teamId: team.id,
      authorId: admin.id,
      tags: ['onboarding', 'client-success'],
      checklistItems: {
        create: [
          { description: 'Send welcome email', order: 1 },
          { description: 'Schedule kickoff call', order: 2 },
          { description: 'Create shared workspace', order: 3 },
        ],
      },
    },
  });

  console.log('Seed complete:', { org: org.slug, team: team.name, admin: admin.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
