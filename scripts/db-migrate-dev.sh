#!/bin/sh

if [ "$1" = "--" ]; then
  shift
fi

exec pnpm --filter @kids-edu/db exec prisma migrate dev "$@"
