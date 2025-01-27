'use server'

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { redirectToSignIn } from '@clerk/nextjs/server'

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    })

    if (registered) {
      return { status: 200, user: registered }
    }
  } catch (error) {
    return { status: 400 }
  }
}

export const onLoginUser = async () => {
  const user = await currentUser();
  if (!user) {
    // Get the current request URL dynamically
    const returnUrl = new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
    return redirectToSignIn({ 
      returnBackUrl: returnUrl.toString()
    });
  }
  
  try {
    const authenticated = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });
    if (authenticated) {
      const domains = await onGetAllAccountDomains();
      return {
        status: 200,
        user: authenticated,
        domain: domains?.domains,
      };
    }
  } catch (error) {
    return { status: 400 }
  }
  return true;
};

export const onGetAllAccountDomains = async () => {
    const user = await currentUser();
    if (!user) return
    try {
        const domains =  await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                id: true,
                domains: {
                    select: {
                        name: true,
                        icon: true,
                        id: true,
                        customer: {
                            select: {
                                chatRoom: {
                                    select: {
                                        id: true,
                                        live: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        return {...domains}
    } catch (error) {
        console.log(error)
    }

}