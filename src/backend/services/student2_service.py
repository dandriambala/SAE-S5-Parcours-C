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
        hobby_data = requests.get(f"{StudentService2.BASE_URL}/hobby").json()['hobby']
        hobby_time_data = requests.get(f"{StudentService2.BASE_URL}/hobby_time_dict").json()['hobby_time_dict']
        vg_data = requests.get(f"{StudentService2.BASE_URL}/vg").json()['vg']
        weekdays_vg_time_data = requests.get(f"{StudentService2.BASE_URL}/weekdays_vg_time_dict").json()['weekdays_vg_time_dict']
        weekend_vg_time_data = requests.get(f"{StudentService2.BASE_URL}/weekend_vg_time_dict").json()['weekend_vg_time_dict']
        parent_schooling_dict_data = requests.get(f"{StudentService2.BASE_URL}/parent_schooling_dict").json()['parent_schooling_dict']

        result = []
        for student in student_data:
            academic_info = next(ai for ai in academic_info_data if ai["academic_info_id"] == student["academic_info_id"])
            academic_perf = next(ap for ap in academic_perf_data if ap["academic_perf_id"] == student["academic_perf_id"])
            family = next(f for f in family_data if f["family_id"] == student["family_id"])

            hobby = next(h for h in hobby_data if h["hobby_id"] == student["hobby_id"])
            weekdays_hobby_time = next(ht for ht in hobby_time_data if ht["hobby_time_id"] == hobby["weekdays_hobby_time_id"])
            weekend_hobby_time = next(ht for ht in hobby_time_data if ht["hobby_time_id"] == hobby["weekend_hobby_time_id"])
            weekdays_chores_time = next(ht for ht in hobby_time_data if ht["hobby_time_id"] == hobby["weekdays_chores_time_id"])
            weekend_chores_time = next(ht for ht in hobby_time_data if ht["hobby_time_id"] == hobby["weekend_chores_time_id"])
            social_media_time = next(sm for sm in hobby_time_data if sm["hobby_time_id"] == hobby["SM_time_id"])

            vg = next(v for v in vg_data if v["vg_id"] == student["vg_id"])
            weekdays_vg_time = next(vt for vt in weekdays_vg_time_data if vt["weekdays_vg_time_id"] == vg["weekdays_VG_time_id"])
            weekend_vg_time = next(vt for vt in weekend_vg_time_data if vt["weekend_vg_time_id"] == vg["weekend_VG_time_id"])

            result.append({
                "schoolingLevel": next(
                    ps["parent_schooling"] for ps in parent_schooling_dict_data if ps["parent_schooling_id"] == family["parent1_schooling_level_id"]
                ),
                "hobbyTimeSm": weekdays_hobby_time["hobby_time"],
                "hobbyTimeWe": weekend_hobby_time["hobby_time"],
                "vgTimeSm": weekdays_vg_time["weekdays_vg_time"],
                "vgTimeWe": weekend_vg_time["weekend_vg_time"],
                "chordsTimeSm": weekdays_chores_time["hobby_time"],
                "chordsTimeWe": weekend_chores_time["hobby_time"],
                "socialMediaTime": social_media_time["hobby_time"],
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
