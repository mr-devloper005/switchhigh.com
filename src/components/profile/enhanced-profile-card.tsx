'use client'

import { Globe, Mail, MapPin, Phone, Link as LinkIcon, User, Heart, MessageCircle, Share2, Video, Users, Grid3x3 } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'
import { useState } from 'react'

interface EnhancedProfileCardProps {
  post: SitePost
  task: string
  taskRoute: string
  category: string
  images: string[]
  description: string
  stats?: {
    pledged?: number
    created?: number
    joined?: string
  }
  arabicText?: string
}

export function EnhancedProfileCard({
  post,
  task,
  taskRoute,
  category,
  images,
  description,
  stats,
  arabicText
}: EnhancedProfileCardProps) {
  const [activeTab, setActiveTab] = useState('timeline')
  const [comment, setComment] = useState('')

  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  
  // Extract domain from website for display
  const getDomainDisplay = (url: string) => {
    try {
      if (!url) return ''
      const domain = new URL(url).hostname
      return domain ? domain.replace('www.', '') : url
    } catch {
      return url
    }
  }

  const domainDisplay = website ? getDomainDisplay(website) : ''
  const fullUrl = website || `${taskRoute}/${post.slug}`

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: Grid3x3 },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'photos', label: 'Photos', icon: Video },
    { id: 'videos', label: 'Videos', icon: Video }
  ]

  const handleLike = () => {
    // Handle like action
  }

  const handleShare = () => {
    // Handle share action
  }

  const handleComment = () => {
    // Handle comment action
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Image with Profile Picture Overlay */}
      <div className="relative h-64 w-full bg-gray-200">
        {images && images.banner && (
          <img src={images.banner} alt="Banner" className="w-full h-full object-cover" />
        )}
        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative h-32 w-32 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center overflow-hidden">
            {images && images.profile ? (
              <ContentImage 
                src={images.profile} 
                alt={`${post.title} profile picture`} 
                fill 
                className="object-cover" 
              />
            ) : (
              <User className="h-16 w-16 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Posts and Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Section */}
            <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <ContentImage 
                    src={images[0]} 
                    alt={`${post.title} avatar`} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600">dhaexam</p>
                  </div>
                </div>
              <p className="text-gray-800 mb-4">Changing their profile picture</p>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={handleLike}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    Like
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Comment
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>

                {/* Comment Input */}
                <div className="mt-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Post
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-500 text-center mt-4">No more posts</p>
              </div>

            {/* Conditional Content Based on Active Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                {/* Timeline content would go here */}
                <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
                  <p className="text-gray-600">Timeline content would be displayed here...</p>
                </div>
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="space-y-6">
                {/* Groups content would go here */}
                <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Groups</h3>
                  <p className="text-gray-600">Groups content would be displayed here...</p>
                </div>
              </div>
            )}

            {activeTab === 'following' && (
              <div className="space-y-6">
                {/* Following content would go here */}
                <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Following</h3>
                  <p className="text-gray-600">Following content would be displayed here...</p>
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="space-y-6">
                {/* Photos content would go here */}
                <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-6">
                {/* Videos content would go here */}
                <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <Video className="h-12 w-12 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">1 posts</span>
                  <a href={website} className="text-blue-600 hover:text-blue-800 text-sm">
                    https://dhaexam.com/dha-exam-preparation/
                  </a>
                </div>
              </div>
            </div>

            {/* About Card */}
            <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed">
                Use Dhaexam.com to easily and confidently pass your DHA Prometric exam. You'll succeed with our in-depth study resources and professional advice!
              </p>
            </div>

            {/* Albums Card */}
            <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Albums</h3>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <p className="text-gray-600">Albums</p>
            </div>

            {/* Following Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Following</h3>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <p className="text-gray-600">Following</p>
              {/* Follower Thumbnails */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-full">
                    <div className="aspect-square bg-gray-200 rounded-lg" />
                    <p className="text-xs text-center mt-1 text-gray-600">User {i}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
