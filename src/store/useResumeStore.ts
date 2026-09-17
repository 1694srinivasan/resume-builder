import { create } from 'zustand';
import { ResumeData, ThemeConfig, ATSAnalysisResult, WorkExperience, Education, SkillGroup, Project, Certification, Language, CustomSection } from '../types/resume';
import { SAMPLE_RESUME_DATA } from '../lib/sampleData';
import { saveResumeToStorage, loadResumeFromStorage, clearResumeStorage, checkHasCustomPasscode, setHasCustomPasscode } from '../lib/storage';
import { analyzeATSCompliance } from '../lib/atsAnalyzer';

interface ResumeStoreState {
  resumeData: ResumeData;
  isEncrypted: boolean;
  passcode?: string;
  targetJobDescription: string;
  atsAnalysis: ATSAnalysisResult;
  isATSPanelOpen: boolean;
  isUploadModalOpen: boolean;
  isSecurityModalOpen: boolean;
  activeEditorTab: 'basics' | 'work' | 'education' | 'skills' | 'projects' | 'custom' | 'theme' | 'reorder';

  // Actions
  initializeStore: (passcode?: string) => Promise<void>;
  updateBasics: (basicsPartial: Partial<ResumeData['basics']>) => void;
  setWork: (work: WorkExperience[]) => void;
  addWork: (item: Omit<WorkExperience, 'id'>) => void;
  updateWork: (id: string, item: Partial<WorkExperience>) => void;
  deleteWork: (id: string) => void;
  
  setEducation: (education: Education[]) => void;
  addEducation: (item: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, item: Partial<Education>) => void;
  deleteEducation: (id: string) => void;

  setSkills: (skills: SkillGroup[]) => void;
  addSkill: (item: Omit<SkillGroup, 'id'>) => void;
  updateSkill: (id: string, item: Partial<SkillGroup>) => void;
  deleteSkill: (id: string) => void;

  setProjects: (projects: Project[]) => void;
  addProject: (item: Omit<Project, 'id'>) => void;
  updateProject: (id: string, item: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  updateThemeConfig: (themePartial: Partial<ThemeConfig>) => void;
  updateSectionOrder: (newOrder: string[]) => void;

  setTargetJobDescription: (jd: string) => void;
  loadSampleData: () => void;
  importResumeData: (data: Partial<ResumeData>) => void;
  resetResume: () => void;

  setPasscode: (passcode: string) => Promise<boolean>;
  removePasscode: () => Promise<void>;

  setATSPanelOpen: (open: boolean) => void;
  setUploadModalOpen: (open: boolean) => void;
  setSecurityModalOpen: (open: boolean) => void;
  setActiveEditorTab: (tab: ResumeStoreState['activeEditorTab']) => void;
}

export const useResumeStore = create<ResumeStoreState>((set, get) => ({
  resumeData: SAMPLE_RESUME_DATA,
  isEncrypted: false,
  passcode: undefined,
  targetJobDescription: '',
  atsAnalysis: analyzeATSCompliance(SAMPLE_RESUME_DATA),
  isATSPanelOpen: false,
  isUploadModalOpen: false,
  isSecurityModalOpen: false,
  activeEditorTab: 'basics',

  initializeStore: async (passcode?: string) => {
    const loaded = await loadResumeFromStorage(passcode);
    const hasCustom = checkHasCustomPasscode();
    if (loaded) {
      set({
        resumeData: loaded,
        isEncrypted: hasCustom,
        passcode: passcode,
        atsAnalysis: analyzeATSCompliance(loaded, get().targetJobDescription),
      });
    } else {
      set({
        isEncrypted: hasCustom,
        passcode: passcode,
      });
    }
  },

  updateBasics: (basicsPartial) => {
    set((state) => {
      const updatedBasics = { ...state.resumeData.basics, ...basicsPartial };
      const updatedData = { ...state.resumeData, basics: updatedBasics };
      saveResumeToStorage(updatedData, state.passcode);
      return {
        resumeData: updatedData,
        atsAnalysis: analyzeATSCompliance(updatedData, state.targetJobDescription),
      };
    });
  },

  setWork: (work) => {
    set((state) => {
      const updatedData = { ...state.resumeData, work };
      saveResumeToStorage(updatedData, state.passcode);
      return {
        resumeData: updatedData,
        atsAnalysis: analyzeATSCompliance(updatedData, state.targetJobDescription),
      };
    });
  },

  addWork: (item) => {
    const newItem: WorkExperience = { ...item, id: 'work-' + Date.now() };
    get().setWork([...get().resumeData.work, newItem]);
  },

  updateWork: (id, item) => {
    const updated = get().resumeData.work.map((w) => (w.id === id ? { ...w, ...item } : w));
    get().setWork(updated);
  },

  deleteWork: (id) => {
    const updated = get().resumeData.work.filter((w) => w.id !== id);
    get().setWork(updated);
  },

  setEducation: (education) => {
    set((state) => {
      const updatedData = { ...state.resumeData, education };
      saveResumeToStorage(updatedData, state.passcode);
      return {
        resumeData: updatedData,
        atsAnalysis: analyzeATSCompliance(updatedData, state.targetJobDescription),
      };
    });
  },

  addEducation: (item) => {
    const newItem: Education = { ...item, id: 'edu-' + Date.now() };
    get().setEducation([...get().resumeData.education, newItem]);
  },

  updateEducation: (id, item) => {
    const updated = get().resumeData.education.map((e) => (e.id === id ? { ...e, ...item } : e));
    get().setEducation(updated);
  },

  deleteEducation: (id) => {
    const updated = get().resumeData.education.filter((e) => e.id !== id);
    get().setEducation(updated);
  },

  setSkills: (skills) => {
    set((state) => {
      const updatedData = { ...state.resumeData, skills };
      saveResumeToStorage(updatedData, state.passcode);
      return {
        resumeData: updatedData,
        atsAnalysis: analyzeATSCompliance(updatedData, state.targetJobDescription),
      };
    });
  },

  addSkill: (item) => {
    const newItem: SkillGroup = { ...item, id: 'skill-' + Date.now() };
    get().setSkills([...get().resumeData.skills, newItem]);
  },

  updateSkill: (id, item) => {
    const updated = get().resumeData.skills.map((s) => (s.id === id ? { ...s, ...item } : s));
    get().setSkills(updated);
  },

  deleteSkill: (id) => {
    const updated = get().resumeData.skills.filter((s) => s.id !== id);
    get().setSkills(updated);
  },

  setProjects: (projects) => {
    set((state) => {
      const updatedData = { ...state.resumeData, projects };
      saveResumeToStorage(updatedData, state.passcode);
      return {
        resumeData: updatedData,
        atsAnalysis: analyzeATSCompliance(updatedData, state.targetJobDescription),
      };
    });
  },

  addProject: (item) => {
    const newItem: Project = { ...item, id: 'proj-' + Date.now() };
    get().setProjects([...get().resumeData.projects, newItem]);
  },

  updateProject: (id, item) => {
    const updated = get().resumeData.projects.map((p) => (p.id === id ? { ...p, ...item } : p));
    get().setProjects(updated);
  },

  deleteProject: (id) => {
    const updated = get().resumeData.projects.filter((p) => p.id !== id);
    get().setProjects(updated);
  },

  updateThemeConfig: (themePartial) => {
    set((state) => {
      const updatedTheme = { ...state.resumeData.themeConfig, ...themePartial };
      const updatedData = { ...state.resumeData, themeConfig: updatedTheme };
      saveResumeToStorage(updatedData, state.passcode);
      return { resumeData: updatedData };
    });
  },

  updateSectionOrder: (newOrder) => {
    set((state) => {
      const updatedData = { ...state.resumeData, sectionOrder: newOrder };
      saveResumeToStorage(updatedData, state.passcode);
      return { resumeData: updatedData };
    });
  },

  setTargetJobDescription: (jd) => {
    set((state) => {
      return {
        targetJobDescription: jd,
        atsAnalysis: analyzeATSCompliance(state.resumeData, jd),
      };
    });
  },

  loadSampleData: () => {
    set((state) => {
      saveResumeToStorage(SAMPLE_RESUME_DATA, state.passcode);
      return {
        resumeData: SAMPLE_RESUME_DATA,
        atsAnalysis: analyzeATSCompliance(SAMPLE_RESUME_DATA, state.targetJobDescription),
      };
    });
  },

  importResumeData: (partial) => {
    set((state) => {
      const merged: ResumeData = {
        ...state.resumeData,
        basics: { ...state.resumeData.basics, ...(partial.basics || {}) },
        work: partial.work || state.resumeData.work,
        education: partial.education || state.resumeData.education,
        skills: partial.skills || state.resumeData.skills,
        projects: partial.projects || state.resumeData.projects,
        certifications: partial.certifications || state.resumeData.certifications,
        languages: partial.languages || state.resumeData.languages,
      };
      saveResumeToStorage(merged, state.passcode);
      return {
        resumeData: merged,
        atsAnalysis: analyzeATSCompliance(merged, state.targetJobDescription),
      };
    });
  },

  resetResume: () => {
    const emptyData: ResumeData = {
      basics: {
        name: '',
        label: '',
        email: '',
        phone: '',
        url: '',
        summary: '',
        location: {},
        profiles: [],
      },
      work: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      customSections: [],
      sectionOrder: ['summary', 'work', 'education', 'skills', 'projects', 'certifications', 'languages'],
      themeConfig: SAMPLE_RESUME_DATA.themeConfig,
    };
    set((state) => {
      saveResumeToStorage(emptyData, state.passcode);
      return {
        resumeData: emptyData,
        atsAnalysis: analyzeATSCompliance(emptyData, state.targetJobDescription),
      };
    });
  },

  setPasscode: async (newPasscode) => {
    const state = get();
    setHasCustomPasscode(true);
    const success = await saveResumeToStorage(state.resumeData, newPasscode);
    if (success) {
      set({ passcode: newPasscode, isEncrypted: true });
      return true;
    }
    return false;
  },

  removePasscode: async () => {
    const state = get();
    setHasCustomPasscode(false);
    await saveResumeToStorage(state.resumeData, undefined);
    set({ passcode: undefined, isEncrypted: false });
  },

  setATSPanelOpen: (open) => set({ isATSPanelOpen: open }),
  setUploadModalOpen: (open) => set({ isUploadModalOpen: open }),
  setSecurityModalOpen: (open) => set({ isSecurityModalOpen: open }),
  setActiveEditorTab: (tab) => set({ activeEditorTab: tab }),
}));
