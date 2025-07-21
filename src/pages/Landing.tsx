import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Briefcase, Zap, Target, Award, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

interface LandingProps {
  onAuthClick: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onAuthClick }) => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Resume Builder',
      description: 'Create professional resumes in minutes with our advanced AI assistance'
    },
    {
      icon: Target,
      title: 'ATS Score Checker',
      description: 'Get real-time ATS scores and optimization recommendations'
    },
    {
      icon: Award,
      title: 'Smart Job Matching',
      description: 'Find the perfect job opportunities tailored to your skills'
    },
    {
      icon: Shield,
      title: 'Multiple Templates',
      description: 'Choose from ATS-optimized templates for different industries'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Build Your Perfect
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empower your career with AI-driven resume building and smart job matching. 
              Connect job seekers with opportunities and help creators find top talent.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              {isAuthenticated ? (
                <>
                  <Link to={user?.type === 'job_seeker' ? '/job-seeker' : '/job-creator'}>
                    <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                      {user?.type === 'job_seeker' ? (
                        <>
                          <Users className="w-5 h-5 mr-2" />
                          Go to Dashboard
                        </>
                      ) : (
                        <>
                          <Briefcase className="w-5 h-5 mr-2" />
                          Go to Dashboard
                        </>
                      )}
                    </Button>
                  </Link>
                  <Link to={user?.type === 'job_seeker' ? '/job-creator' : '/job-seeker'}>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]">
                      {user?.type === 'job_seeker' ? (
                        <>
                          <Briefcase className="w-5 h-5 mr-2" />
                          Explore Job Creator
                        </>
                      ) : (
                        <>
                          <Users className="w-5 h-5 mr-2" />
                          Explore Job Seeker
                        </>
                      )}
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto min-w-[200px]"
                    onClick={onAuthClick}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    I'm a Job Seeker
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full sm:w-auto min-w-[200px]"
                    onClick={onAuthClick}
                  >
                    <Briefcase className="w-5 h-5 mr-2" />
                    I'm a Job Creator
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Rezume?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of career development with our cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center h-full">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: '50K+', label: 'Resumes Created' },
              { number: '95%', label: 'ATS Pass Rate' },
              { number: '15K+', label: 'Jobs Matched' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="p-8">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};