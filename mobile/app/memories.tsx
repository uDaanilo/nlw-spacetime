import { Link, useRouter } from "expo-router"
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import NLWLogo from "../src/assets/spacetime-logo.svg"
import Icon from "@expo/vector-icons/Feather"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react"
import { api } from "../src/lib/api"
import dayjs from "dayjs"
import ptBR from "dayjs/locale/pt-br"

interface Memory {
  id: string
  excerpt: string
  coverUrl: string
  createdAt: string
}

dayjs.locale(ptBR)

export default function Memories() {
  const router = useRouter()
  const [memories, setMemories] = useState<Memory[]>([])
  const { bottom, top } = useSafeAreaInsets()

  async function signOut() {
    await SecureStore.deleteItemAsync("token")
    router.push("/")
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync("token")

    const memoriesRes = await api.get("/memories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(memoriesRes.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom + 24,
      }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NLWLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View key={memory.id} className="space-y-4">
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createdAt).format("D [de] MMMM, YYYY")}
              </Text>
            </View>

            <View className="space-y-4 px-8">
              <Image
                source={{
                  uri: memory.coverUrl,
                }}
                className="aspect-video w-full rounded-lg"
              />
              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>

              <Link href={`/memories/${memory.id}`} asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="font-body text-sm text-gray-200">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
