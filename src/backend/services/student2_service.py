from repositories.student_repository import StudentRepository
import requests

class StudentService2:
    BASE_URL = "http://127.0.0.1:5000/tables2"

    @staticmethod
    def get_all_students():
     
  
        student_data = requests.get(f"{StudentService2.BASE_URL}/student").json()['student']
        academic_info_data = requests.get(f"{StudentService2.BASE_URL}/academic_info").json()['academic_info']
        academic_perf_data = requests.get(f"{StudentService2.BASE_URL}/academic_perf").json()['academic_perf']
        family_data = requests.get(f"{StudentService2.BASE_URL}/family").json()['family']
        hobby_time_data = requests.get(f"{StudentService2.BASE_URL}/hobby_time_dict").json()['hobby_time_dict']
        #weekdays_vg_time_data = requests.get(f"{StudentService2.BASE_URL}/weekdays_vg_time_dict").json()['weekdays_vg_time_dict']
        #weekend_vg_time_data = requests.get(f"{StudentService2.BASE_URL}/weekend_vg_time_dict").json()['weekend_vg_time_dict']
        #social_media_time_data = requests.get(f"{StudentService2.BASE_URL}/social_media_time").json()['social_media_time']
        parent_schooling_dict_data = requests.get(f"{StudentService2.BASE_URL}/parent_schooling_dict").json()['parent_schooling_dict']

        result = []
        for student in student_data:
            academic_info = next(ai for ai in academic_info_data if ai["academic_info_id"] == student["academic_info_id"])
            academic_perf = next(ap for ap in academic_perf_data if ap["academic_perf_id"] == student["academic_perf_id"])
            family = next(f for f in family_data if f["family_id"] == student["family_id"])
            hobby_time = next(ht for ht in hobby_time_data if ht["hobby_time_id"] == student["hobby_time_id"])
            #weekdays_vg_time = next(vt for vt in weekdays_vg_time_data if vt["weekdays_vg_time_id"] == student["vg_time_id"])
            #weekend_vg_time = next(vt for vt in weekend_vg_time_data if vt["weekend_vg_time_id"] == student["vg_time_id"])
            #social_media_time = next(sm for sm in social_media_time_data if sm["social_media_time_id"] == student["social_media_time_id"])

            result.append({
                "schoolingLevel": next(
                    ps["parent_schooling"] for ps in parent_schooling_dict_data if ps["parent_schooling_id"] == family["parent1_schooling_level_id"]
                ),
                #"studyField": academic_info["study_field"],
                #"houseHold": family["household_type"],
                "hobbyTimeSm": hobby_time["hobby_time_sm"],
                "hobbyTimeWe": hobby_time["hobby_time_we"],
                #"vgTimeSm": vg_time["vg_time_sm"],
                #"vgTimeWe": vg_time["vg_time_we"],
                #"chordsTimeSm": hobby_time["chords_time_sm"],
                #"chordsTimeWe": hobby_time["chords_time_we"],
                #"socialMediaTime": social_media_time["daily_social_media_time"],
                "avg_grade": str(academic_perf["avg_grade"]),
                "english_grade": str(academic_perf["english_avg_grade"]),
                "target_education": "yes" if academic_info["further_study"] else "no",
                "Medu": next(
                    ps["parent_schooling"] for ps in parent_schooling_dict_data if ps["parent_schooling_id"] == family["parent1_schooling_level_id"]
                ),
                "Fedu": next(
                    ps["parent_schooling"] for ps in parent_schooling_dict_data if ps["parent_schooling_id"] == family["parent2_schooling_level_id"]
                ),
            })

        return result
